import type { Metadata } from "next";

import ContactContent from "./contact-content";

export const metadata: Metadata = {
  title: "Contato | Studio M — Soluções Visuais",
  description:
    "Vamos conversar sobre a próxima fase da sua marca. Preencha o formulário ou fale direto com o Studio M pelo WhatsApp ou e-mail.",
  alternates: {
    canonical: "https://studio-m-pearl.vercel.app/contato",
  },
  openGraph: {
    title: "Fale com o Studio M",
    description: "Conte-nos o momento da sua marca e o que deseja criar. Responderemos em até um dia útil.",
    url: "https://studio-m-pearl.vercel.app/contato",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
