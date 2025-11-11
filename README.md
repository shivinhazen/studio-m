# Studio M – Soluções Visuais

Site institucional do Studio M, estúdio boutique liderado por Lucas Leão e especializado em identidades visuais, experiências digitais e materiais impressos de alta fidelidade. O projeto apresenta portfólio, serviços, manifesto e canal direto de contato com clientes.

## Tecnologias principais

- **Next.js 16 (App Router)** com React 19 e TypeScript
- **Tailwind CSS 4** com design system próprio (tokens de cor, tipografia, utilidades customizadas)
- **Framer Motion** para animações sutis nos componentes de interface
- **Lucide React** para ícones
- **Nodemailer** para envio de mensagens do formulário de contato via SMTP

## Estrutura do projeto

```
studio-m/
├─ app/                 # Páginas usando App Router, layouts e estilos globais
│  ├─ api/contato/      # Endpoint POST que envia mensagens via e-mail
│  ├─ contato/          # Página com formulário dinâmico e canais diretos
│  ├─ portfolio/        # Casos reais do estúdio utilizando ProjectCard
│  ├─ politica-de-privacidade/ e termos-de-uso/ # Páginas legais
│  └─ ...               # Demais rotas (home, serviços, sobre)
├─ components/          # Componentes reutilizáveis
│  ├─ header, footer    # Cabeçalho e rodapé compartilhados
│  ├─ section-title     # Headline com gradiente da marca
│  └─ ui/               # Biblioteca de UI (Button, Card, Badge)
├─ lib/                 # Utilitários (ex.: função `cn`)
├─ public/              # Logo, mockups de projetos e favicon
└─ README.md            # Este documento
```

## Configuração e scripts

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Crie um arquivo `.env.local` na raiz com as variáveis do SMTP:
   ```bash
   SMTP_HOST=smtp.seuprovedor.com
   SMTP_PORT=587
   SMTP_SECURE=false        # true para porta 465
   SMTP_USER=seu_usuario
   SMTP_PASS=sua_senha
   SMTP_FROM=contato@studiom.design
   CONTACT_EMAIL=contato@studiom.design
   ```
3. Execute em desenvolvimento:
   ```bash
   npm run dev
   ```
4. Build de produção:
   ```bash
   npm run build
   npm start
   ```
5. Verificação de lint:
   ```bash
   npm run lint
   ```

> O projeto é otimizado para deploy na [Vercel](https://vercel.com/). Basta conectar o repositório; as variáveis de ambiente devem ser configuradas no painel da plataforma.

## Estilo e branding

- Tipografias carregadas com `next/font`: **Reddit Sans** (headings) e **Sora** (corpo).
- Tokens de cor e utilidades tipográficas definidos em `app/globals.css`.
- Componentes de UI criados com `class-variance-authority` e `tailwind-merge`, garantindo consistência de espaçamentos, gaps e estados.
- Tema claro/escuro com persistência em localStorage e script para evitar FOUC (Flash of Unstyled Content).

## Formulário de contato

- Página `app/contato/page.tsx` é um componente client-side com validações em tempo real, feedback de erro/sucesso e honeypot para mitigar spam.
- Endpoint `POST /api/contato` monta um e-mail estruturado com os dados do lead via Nodemailer. Em ambientes sem SMTP configurado, a mensagem é logada no servidor para facilitar testes.

## Portfólio e conteúdo

- Os projetos em destaque utilizam o componente `ProjectCard`, com animações suaves e gradientes da identidade visual.
- Links de WhatsApp, Instagram e LinkedIn apontam para os perfis oficiais do Studio M.
- Páginas legais (`/politica-de-privacidade` e `/termos-de-uso`) garantem transparência e conformidade com a LGPD.

## Boas práticas e QA

- Conteúdo revisado em português com tom premium, acolhedor e consistente (tratamento em “você”).
- Layout responsivo validado em breakpoints mobile, tablet e desktop.
- Teste manual recomendado após ajustes:
  - Verificar envio do formulário e recebimento do e-mail.
  - Conferir navegação em tema claro/escuro e menu mobile.
  - Validar links externos (WhatsApp, Instagram, LinkedIn) e páginas legais.

---

Desenvolvido pelo Studio M – Soluções Visuais. Para dúvidas técnicas ou colaboração, escreva para [contato@studiom.design](mailto:contato@studiom.design).
