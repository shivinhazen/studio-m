import nodemailer from "nodemailer";
import { Buffer } from "node:buffer";
import { NextResponse } from "next/server";

import { MAX_REFERENCE_FILE_SIZE } from "@/lib/constants";

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

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  let data: Partial<ContactPayload> = {};

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    const textFields: (keyof ContactPayload)[] = [
      "name",
      "email",
      "phone",
      "company",
      "brandMoment",
      "collaborationGoal",
      "references",
      "message",
      "websiteTrap",
    ];

    for (const field of textFields) {
      const value = formData.get(field as string);
      if (typeof value === "string") {
        data[field] = value;
      }
    }

    const fileEntry = formData.get("referenceFile");
    if (fileEntry instanceof File && fileEntry.size > 0) {
      data.referenceFile = fileEntry;
    }
  } else {
    data = (await request.json().catch(() => ({}))) as Partial<ContactPayload>;
  }

  if (data.websiteTrap) {
    return NextResponse.json({ ok: true });
  }

  const errors: Record<string, string> = {};

  if (!data.name?.trim()) {
    errors.name = "Informe seu nome completo.";
  }

  if (!data.email?.trim()) {
    errors.email = "Informe um e-mail válido.";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Formato de e-mail inválido.";
  }

  if (data.referenceFile && data.referenceFile.size > MAX_REFERENCE_FILE_SIZE) {
    errors.referenceFile = "O arquivo enviado excede o limite de 20 MB.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, errors, message: "Revise os campos destacados para continuar." },
      { status: 400 }
    );
  }

  const referenceFile =
    data.referenceFile && data.referenceFile.size > 0 ? data.referenceFile : undefined;
  const attachmentLabel = referenceFile
    ? `${referenceFile.name} (${(referenceFile.size / (1024 * 1024)).toFixed(1)} MB)`
    : undefined;

  const transporterConfig = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
    secure: process.env.SMTP_SECURE === "true" || process.env.SMTP_PORT === "465",
    auth:
      process.env.SMTP_USER && process.env.SMTP_PASS
        ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          }
        : undefined,
  } as const;

  const toAddress = process.env.CONTACT_EMAIL ?? process.env.SMTP_USER;

  if (transporterConfig.auth && transporterConfig.host && toAddress) {
    const transporter = nodemailer.createTransport(transporterConfig);

    const htmlContent = `
      <h2>Nova mensagem pelo site Studio M</h2>
      <p><strong>Nome:</strong> ${data.name}</p>
      <p><strong>E-mail:</strong> ${data.email}</p>
      ${data.phone ? `<p><strong>Telefone:</strong> ${data.phone}</p>` : ""}
      ${data.company ? `<p><strong>Empresa:</strong> ${data.company}</p>` : ""}
      ${data.brandMoment ? `<p><strong>Momento da marca:</strong> ${data.brandMoment}</p>` : ""}
      ${data.collaborationGoal ? `<p><strong>O que deseja criar:</strong> ${data.collaborationGoal}</p>` : ""}
      ${
        data.references
          ? `<p><strong>Referências ou materiais:</strong><br />${(data.references ?? "").replace(/\n/g, "<br />")}</p>`
          : ""
      }
      ${
        data.message
          ? `<p><strong>Observações adicionais:</strong><br />${(data.message ?? "").replace(/\n/g, "<br />")}</p>`
          : ""
      }
      ${attachmentLabel ? `<p><strong>Anexo recebido:</strong> ${attachmentLabel}</p>` : ""}
    `;
    const attachments = referenceFile
      ? [
          {
            filename: referenceFile.name,
            content: Buffer.from(await referenceFile.arrayBuffer()),
            contentType: referenceFile.type || undefined,
          },
        ]
      : undefined;

    try {
      await transporter.sendMail({
        from: {
          name: "Studio M Site",
          address: process.env.SMTP_FROM ?? (process.env.SMTP_USER as string),
        },
        replyTo: data.email,
        to: toAddress,
        subject: `Novo contato | ${data.name}`,
        text: `
Nome: ${data.name}
E-mail: ${data.email}
${data.phone ? `Telefone: ${data.phone}\n` : ""}${
          data.company ? `Empresa: ${data.company}\n` : ""
        }${data.brandMoment ? `Momento da marca: ${data.brandMoment}\n` : ""}${
          data.collaborationGoal ? `O que deseja criar: ${data.collaborationGoal}\n` : ""
        }${data.references ? `Referências ou materiais: ${data.references}\n` : ""}${
          data.message ? `Observações adicionais: ${data.message}\n` : ""
        }${attachmentLabel ? `Anexo recebido: ${attachmentLabel}\n` : ""
        }
        `.trim(),
        html: htmlContent,
        attachments,
      });
    } catch (error) {
      console.error("Erro ao enviar e-mail de contato:", error);
      return NextResponse.json(
        {
          ok: false,
          message: "Não foi possível enviar sua mensagem agora. Por favor, tente novamente em alguns minutos.",
        },
        { status: 500 }
      );
    }
  } else {
    console.warn("SMTP não configurado. Mensagens serão registradas apenas em log.");
    console.info("Lead Studio M:", {
      ...data,
      referenceFile: referenceFile
        ? { name: referenceFile.name, size: referenceFile.size, type: referenceFile.type }
        : undefined,
    });
  }

  return NextResponse.json({
    ok: true,
    message: "Recebemos sua mensagem! Responderemos em até um dia útil.",
  });
}
