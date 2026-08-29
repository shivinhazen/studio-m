import { Buffer } from "node:buffer";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

import {
  ALLOWED_REFERENCE_FILE_EXTENSIONS,
  MAX_CONTACT_REQUEST_SIZE,
  MAX_REFERENCE_FILE_SIZE,
} from "@/lib/constants";

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  brandMoment?: string;
  collaborationGoal?: string;
  references?: string;
  message?: string;
  websiteTrap?: string;
  referenceFile?: File | null;
};

type TextField = Exclude<keyof ContactPayload, "referenceFile">;

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const FIELD_LIMITS: Record<TextField, number> = {
  name: 120,
  email: 254,
  phone: 40,
  company: 160,
  brandMoment: 300,
  collaborationGoal: 500,
  references: 4_000,
  message: 4_000,
  websiteTrap: 200,
};

const ALLOWED_MIME_TYPES: Record<string, ReadonlySet<string>> = {
  ".pdf": new Set(["application/pdf", "application/octet-stream"]),
  ".png": new Set(["image/png", "application/octet-stream"]),
  ".jpg": new Set(["image/jpeg", "application/octet-stream"]),
  ".jpeg": new Set(["image/jpeg", "application/octet-stream"]),
  ".svg": new Set(["image/svg+xml", "application/octet-stream"]),
  ".zip": new Set([
    "application/zip",
    "application/x-zip-compressed",
    "application/octet-stream",
  ]),
  ".ai": new Set([
    "application/pdf",
    "application/postscript",
    "application/octet-stream",
  ]),
  ".psd": new Set(["image/vnd.adobe.photoshop", "application/octet-stream"]),
  ".fig": new Set(["application/octet-stream", "application/zip"]),
};

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitBuckets = new Map<string, RateLimitBucket>();

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

function safeHeaderValue(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function safeFilename(value: string) {
  return value
    .replace(/[\r\n]/g, "")
    .replace(/[\\/]/g, "_")
    .trim()
    .slice(0, 180);
}

function getExtension(filename: string) {
  const index = filename.lastIndexOf(".");
  return index >= 0 ? filename.slice(index).toLowerCase() : "";
}

function validateReferenceFile(file: File) {
  if (file.size > MAX_REFERENCE_FILE_SIZE) {
    return "O arquivo enviado excede o limite de 15 MB.";
  }

  const extension = getExtension(file.name);
  if (!ALLOWED_REFERENCE_FILE_EXTENSIONS.includes(extension as (typeof ALLOWED_REFERENCE_FILE_EXTENSIONS)[number])) {
    return "Formato de arquivo não permitido.";
  }

  const allowedMimeTypes = ALLOWED_MIME_TYPES[extension];
  if (file.type && allowedMimeTypes && !allowedMimeTypes.has(file.type.toLowerCase())) {
    return "O tipo do arquivo não corresponde ao formato informado.";
  }

  return null;
}

function getClientIdentifier(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwardedFor || request.headers.get("x-real-ip")?.trim() || null;
}

function checkRateLimit(request: Request) {
  const identifier = getClientIdentifier(request);
  if (!identifier) return null;

  const now = Date.now();
  const current = rateLimitBuckets.get(identifier);

  if (!current || current.resetAt <= now) {
    rateLimitBuckets.set(identifier, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
  } else if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return Math.max(1, Math.ceil((current.resetAt - now) / 1_000));
  } else {
    current.count += 1;
  }

  if (rateLimitBuckets.size > 1_000) {
    for (const [key, bucket] of rateLimitBuckets) {
      if (bucket.resetAt <= now) rateLimitBuckets.delete(key);
    }
  }

  return null;
}

function normalizePayload(data: Partial<ContactPayload>) {
  const normalized: Partial<ContactPayload> = { referenceFile: data.referenceFile };

  for (const field of Object.keys(FIELD_LIMITS) as TextField[]) {
    const value = data[field];
    if (typeof value === "string") normalized[field] = value.trim();
  }

  return normalized;
}

export async function POST(request: Request) {
  const retryAfter = checkRateLimit(request);
  if (retryAfter !== null) {
    return NextResponse.json(
      { ok: false, message: "Muitas tentativas. Aguarde alguns minutos e tente novamente." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_CONTACT_REQUEST_SIZE) {
    return NextResponse.json(
      { ok: false, message: "A solicitação excede o tamanho permitido." },
      { status: 413 }
    );
  }

  const contentType = request.headers.get("content-type") ?? "";
  let data: Partial<ContactPayload> = {};

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    const textFields = Object.keys(FIELD_LIMITS) as TextField[];

    for (const field of textFields) {
      const value = formData.get(field);
      if (typeof value === "string") data[field] = value;
    }

    const fileEntry = formData.get("referenceFile");
    if (fileEntry instanceof File && fileEntry.size > 0) data.referenceFile = fileEntry;
  } else if (contentType.includes("application/json")) {
    data = (await request.json().catch(() => ({}))) as Partial<ContactPayload>;
  } else {
    return NextResponse.json(
      { ok: false, message: "Formato de solicitação não suportado." },
      { status: 415 }
    );
  }

  const normalized = normalizePayload(data);

  if (normalized.websiteTrap) {
    return NextResponse.json({ ok: true });
  }

  const errors: Record<string, string> = {};

  if (!normalized.name) errors.name = "Informe seu nome completo.";
  if (!normalized.email) {
    errors.email = "Informe um e-mail válido.";
  } else if (!isValidEmail(normalized.email)) {
    errors.email = "Formato de e-mail inválido.";
  }

  for (const [field, maxLength] of Object.entries(FIELD_LIMITS) as [TextField, number][]) {
    const value = normalized[field];
    if (typeof value === "string" && value.length > maxLength) {
      errors[field] = `Este campo aceita no máximo ${maxLength} caracteres.`;
    }
  }

  const referenceFile =
    normalized.referenceFile instanceof File && normalized.referenceFile.size > 0
      ? normalized.referenceFile
      : undefined;

  if (referenceFile) {
    const fileError = validateReferenceFile(referenceFile);
    if (fileError) errors.referenceFile = fileError;
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, errors, message: "Revise os campos destacados para continuar." },
      { status: 400 }
    );
  }

  const smtpHost = process.env.SMTP_HOST?.trim();
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS;
  const toAddress = (process.env.CONTACT_EMAIL ?? smtpUser)?.trim();
  const fromAddress = (process.env.SMTP_FROM ?? smtpUser)?.trim();

  if (!smtpHost || !smtpUser || !smtpPass || !toAddress || !fromAddress) {
    console.warn("SMTP não configurado; a mensagem de contato não foi registrada nem entregue.");
    return NextResponse.json(
      {
        ok: false,
        message: "O canal de contato está temporariamente indisponível. Tente novamente em alguns minutos.",
      },
      { status: 503 }
    );
  }

  const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
  if (!Number.isInteger(smtpPort) || smtpPort <= 0 || smtpPort > 65_535) {
    console.error("Configuração SMTP inválida: porta fora da faixa permitida.");
    return NextResponse.json(
      { ok: false, message: "O canal de contato está temporariamente indisponível." },
      { status: 503 }
    );
  }

  const safeName = safeHeaderValue(normalized.name as string).slice(0, FIELD_LIMITS.name);
  const safeEmail = safeHeaderValue(normalized.email as string).slice(0, FIELD_LIMITS.email);
  const attachmentFilename = referenceFile ? safeFilename(referenceFile.name) || "referencia" : undefined;
  const attachmentLabel = referenceFile
    ? `${attachmentFilename} (${(referenceFile.size / (1024 * 1024)).toFixed(1)} MB)`
    : undefined;

  const htmlValue = (value?: string) => (value ? escapeHtml(value).replace(/\n/g, "<br />") : "");
  const htmlContent = `
    <h2>Nova mensagem pelo site Studio M</h2>
    <p><strong>Nome:</strong> ${htmlValue(safeName)}</p>
    <p><strong>E-mail:</strong> ${htmlValue(safeEmail)}</p>
    ${normalized.phone ? `<p><strong>Telefone:</strong> ${htmlValue(normalized.phone)}</p>` : ""}
    ${normalized.company ? `<p><strong>Empresa:</strong> ${htmlValue(normalized.company)}</p>` : ""}
    ${normalized.brandMoment ? `<p><strong>Momento da marca:</strong> ${htmlValue(normalized.brandMoment)}</p>` : ""}
    ${normalized.collaborationGoal ? `<p><strong>O que deseja criar:</strong> ${htmlValue(normalized.collaborationGoal)}</p>` : ""}
    ${normalized.references ? `<p><strong>Referências ou materiais:</strong><br />${htmlValue(normalized.references)}</p>` : ""}
    ${normalized.message ? `<p><strong>Observações adicionais:</strong><br />${htmlValue(normalized.message)}</p>` : ""}
    ${attachmentLabel ? `<p><strong>Anexo recebido:</strong> ${htmlValue(attachmentLabel)}</p>` : ""}
  `;

  const textContent = [
    `Nome: ${safeName}`,
    `E-mail: ${safeEmail}`,
    normalized.phone ? `Telefone: ${normalized.phone}` : "",
    normalized.company ? `Empresa: ${normalized.company}` : "",
    normalized.brandMoment ? `Momento da marca: ${normalized.brandMoment}` : "",
    normalized.collaborationGoal ? `O que deseja criar: ${normalized.collaborationGoal}` : "",
    normalized.references ? `Referências ou materiais: ${normalized.references}` : "",
    normalized.message ? `Observações adicionais: ${normalized.message}` : "",
    attachmentLabel ? `Anexo recebido: ${attachmentLabel}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: process.env.SMTP_SECURE === "true" || smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
    disableFileAccess: true,
    disableUrlAccess: true,
  });

  const attachments = referenceFile
    ? [
        {
          filename: attachmentFilename,
          content: Buffer.from(await referenceFile.arrayBuffer()),
          contentType: referenceFile.type || undefined,
        },
      ]
    : undefined;

  try {
    await transporter.sendMail({
      from: { name: "Studio M Site", address: fromAddress },
      replyTo: safeEmail,
      to: toAddress,
      subject: `Novo contato | ${safeName}`,
      text: textContent,
      html: htmlContent,
      attachments,
    });
  } catch (error) {
    console.error(
      "Erro ao enviar e-mail de contato:",
      error instanceof Error ? error.message : "erro desconhecido"
    );
    return NextResponse.json(
      {
        ok: false,
        message: "Não foi possível enviar sua mensagem agora. Por favor, tente novamente em alguns minutos.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Recebemos sua mensagem! Responderemos em até um dia útil.",
  });
}
