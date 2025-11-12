# Studio M – Soluções Visuais

Site institucional oficial do Studio M, estúdio boutique de identidades visuais, experiências digitais e materiais impressos. O projeto traduz o posicionamento premium do estúdio em uma experiência editorial com portfólio curado, manifesto, descrição de serviços e fluxo completo de contato para novos projetos.

---

## ✨ Destaques do projeto

- **Narrativa imersiva** – home com hero animado, serviços, diferenciais, portfólio em destaque, processo e CTA final.
- **Design system próprio** – tokens em Tailwind CSS 4, componentes reutilizáveis (`components/ui`), tipografia Reddit Sans + Sora e tema claro/escuro persistente.
- **Motion com critério** – Framer Motion aliado a hooks (`useStableReducedMotion`, `useParallaxHover`, `useMediaQuery`) para garantir acessibilidade.
- **Fluxo de contato inteligente** – formulário rico em `app/contato` com upload de referências, validações, honeypot e envio via Nodemailer/SMTP.
- **Compliance & conteúdo** – páginas de Política de Privacidade e Termos de Uso alinhadas à LGPD e rotas institucionais independentes (serviços, sobre, portfólio).

---

## ⚙️ Stack

| Área                | Ferramentas                                                                           |
| ------------------- | -------------------------------------------------------------------------------------- |
| Front-end           | Next.js 16 (App Router) • React 19 • TypeScript                                       |
| Estilos             | Tailwind CSS 4 • class-variance-authority • tailwind-merge                             |
| Animações           | Framer Motion • Hooks customizados para parallax e motion reduzido                     |
| Ícones              | Lucide React                                                                           |
| Formulário/Envio    | Nodemailer com SMTP configurável                                                       |
| Deploy sugerido     | [Vercel](https://vercel.com) com preview branches e variáveis no dashboard             |

---

## 🗂️ Estrutura principal

```
studio-m/
├─ app/
│  ├─ (site)/components/      # Hero, serviços, diferenciais, projetos, processo, CTA
│  ├─ api/contato/            # Endpoint que envia e-mails formatados
│  ├─ contato/                # Formulário, canais diretos e integrações
│  ├─ portfolio/, servicos/, sobre/
│  ├─ politica-de-privacidade/, termos-de-uso/
│  └─ layout.tsx, globals.css # Layout base, temas e tokens (OKLCH)
├─ components/                # Header, Footer, CallToAction, biblioteca UI
├─ hooks/                     # `useMediaQuery`, `useParallaxHover`, `useStableReducedMotion`
├─ lib/                       # Utilitários (`cn`) e constantes globais
├─ public/assets/             # Logo, mockups de portfólio, favicons
└─ README.md
```

---

## 🚀 Como rodar localmente

Pré-requisitos: Node 18+ (ou superior) e npm.

```bash
# Clonar e instalar
git clone https://github.com/shivinhazen/studio-m.git
cd studio-m
npm install
```

### Variáveis de ambiente (`.env.local`)

```ini
SMTP_HOST=smtp.seuprovedor.com
SMTP_PORT=587
SMTP_SECURE=false          # true para porta 465
SMTP_USER=seu_usuario
SMTP_PASS=sua_senha
SMTP_FROM=contato@studiom.design
CONTACT_EMAIL=contato@studiom.design
```

### Scripts disponíveis

| Comando         | Descrição                                           |
| --------------- | --------------------------------------------------- |
| `npm run dev`   | Ambiente de desenvolvimento (Next + Turbopack)      |
| `npm run build` | Build otimizado para produção                       |
| `npm start`     | Servir o build localmente                           |
| `npm run lint`  | Verificações de lint com ESLint + regras do Next.js |
| `npm run lint:deps` | Audita dependências órfãs usando `depcheck` customizado |
| `npm run optimize:images` | Converte mockups para WebP otimizados (usa `sharp`) |
| `npm run qa:axe` | Varredura de acessibilidade com `@axe-core/cli` no deploy da Vercel |
| `npm run qa:lhci` | Lighthouse CI (produção) com asserts mínimas        |
| `npm run qa:full` | Pipeline completa: lint + deps + Axe + Lighthouse   |

> Na Vercel, basta conectar o repositório e replicar as variáveis acima no painel. O build padrão (`npm run build`) já entrega a versão final.

---

## 🧪 Automação de QA

- `npm run qa:axe` — roda o `@axe-core/cli` contra `https://studio-m-pearl.vercel.app` validando WCAG 2.1 A/AA.
- `npm run qa:lhci` — executa o Lighthouse CI (config em `lighthouserc.json`) para Home, Portfólio e Contato.
- `npm run qa:full` — pipeline completa: `lint`, `lint:deps`, Axe e Lighthouse.
- `npm run lint:deps` — garante que não há dependências órfãs; falha somente se algo fora da allowlist é detectado.
- `npm run optimize:images` — converte os mockups de `/public/assets/portfolio/mockups` para WebP (usa `sharp`).

> Sugestão: agendar `npm run qa:full` no CI antes de liberar um deploy final.

---

## 🧱 Design system & conteúdo

- **Tipografia** via `next/font`: Reddit Sans (headings) e Sora (texto).
- **Tokens globais** (`app/globals.css`): paleta em OKLCH, gradientes de marca, raios e utilidades tipográficas.
- **Componentes reutilizáveis**: `CallToAction`, `ProjectCard`, `SectionTitle`, `Header`, `Footer`, botões e badges com CVA.
- **Motion**: variantes centralizadas em `app/(site)/components/motion-utils.ts`, reduzindo repetição e garantindo consistência.
- **Controle de tema**: script inline previne FOUC e mantém a escolha light/dark sincronizada com `localStorage`.

---

## 📬 Fluxo de contato

1. `app/contato/page.tsx` aplica validações em tempo real, exibe feedback e aceita upload de referência (até 20 MB).
2. `app/api/contato/route.ts` monta o e-mail (HTML e texto) e envia via Nodemailer; se não houver SMTP, loga a mensagem para debug.
3. Honeypot `websiteTrap` impede envios automatizados sem atrapalhar usuários reais.

---

## ✅ Checklist de QA

- [ ] Testar envio do formulário com e sem arquivo e confirmar e-mail recebido.
- [ ] Navegar em tema claro/escuro e menu mobile para garantir responsividade.
- [ ] Verificar animações com `prefers-reduced-motion` ativado.
- [ ] Conferir links para WhatsApp, e-mail e páginas legais.
- [ ] Rodar `npm run lint` e `npm run build` antes de cada deploy.

---

## ✅ To-do técnico

### UI / Layout
- [x] Ajustar `max-w-6xl` para `max-w-7xl` em rotas desktop-first (ex.: `/`, `/portfolio`) mantendo responsividade.
- [x] Manter o grid da seção “Processo” em `md:grid-cols-2` até `lg` para evitar cards estreitos.
- [x] Adicionar foco visível aos links da navegação desktop/mobile.
- [x] Incluir um botão “Pular para conteúdo” visível ao foco para melhorar a navegação por teclado.

### Performance
- [x] Remover `'use client'` da página raiz e manter apenas componentes animados como client components.
- [x] Centralizar Framer Motion via `LazyMotion` + `domAnimation` para reduzir bundles duplicados.
- [x] Otimizar mockups de `/portfolio` (WebP/AVIF + `blurDataURL` e `priority` apenas no topo).
- [x] Aplicar lazy loading às seções abaixo da dobra (Projects, Process, Final CTA).
- [x] Usar `requestIdleCallback` em efeitos não críticos (parallax, scroll observers) para aliviar TBT.

### Acessibilidade
- [x] Corrigir feedback de status do formulário com `role="status"` e `aria-live="polite"`.
- [x] Propagar `aria-invalid`/`aria-describedby` para campos com erro.
- [x] Remover tabulação fantasma em cards não interativos garantindo ordem lógica de foco.

### SEO e metadata
- [x] Adicionar metadata completa por rota (`generateMetadata` com title/description/OG/Twitter/canonical/robots).
- [x] Corrigir `metadataBase` para o domínio final.
- [x] Implementar `app/robots.ts` e `app/sitemap.ts`.
- [x] Incluir schema JSON-LD com dados do Studio M.

### Core Web Vitals
- [x] Otimizar o LCP (imagens pesadas do portfólio e hero).
- [x] Reduzir TBT evitando hidratação desnecessária/animações simultâneas.
- [x] Confirmar CLS zerado com placeholders/`blurDataURL`.

### Extras recomendados
- [x] Revisar `package.json` em busca de dependências não utilizadas ou desatualizadas.
- [x] Limpar assets estáticos que não entram no build final.
- [x] Consolidar hooks/utilitários de motion para reduzir duplicação.
- [x] Configurar automações de QA (Lighthouse CI + Axe + lint de dependências).
- [x] Documentar no README as novas otimizações e atualizar o checklist de QA conforme necessário.

---

## 📄 Licença & contato

Código proprietário do Studio M – Soluções Visuais. Para dúvidas técnicas ou colaborações, escreva para [contato@studiom.design](mailto:contato@studiom.design).
