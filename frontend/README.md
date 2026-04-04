# UniTec EAD - Plataforma de Ensino a Distância

Plataforma educacional moderna de ensino a distância (EAD) construída com **Next.js 16**, **TypeScript**, **Tailwind CSS**, **Drizzle ORM** e **Clerk Auth**.

Aprenda com as melhores vídeoaulas do YouTube. Cursos estruturados, progresso rastreado e comunidade engajada.

---

## 🚀 Stack Tecnológico

### Frontend
- **Next.js 16** - App Router
- **React 19** - UI Library
- **TypeScript** - Type Safety
- **Tailwind CSS 4** - Styling
- **Lucide React** - Icons

### Backend & Database
- **Node.js** - Runtime
- **PostgreSQL** - Database (Neon)
- **Drizzle ORM** - Query Builder
- **@neondatabase/serverless** - Database Driver

### Autenticação & Formulários
- **Clerk** - Authentication
- **React Hook Form** - Form Management
- **Zod** - Validation
- **@hookform/resolvers** - Form Resolvers

### State Management & UX
- **TanStack React Query** - Data Fetching
- **TanStack React Query DevTools** - DevTools
- **Sonner** - Toast Notifications
- **ESLint** - Code Quality

---

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta no [Clerk](https://clerk.com) (autenticação)
- Banco de dados PostgreSQL (via [Neon](https://neon.tech))
- Chave da API do YouTube (opcional, para integração de vídeos)

---

## 🔧 Setup Inicial

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/unitec-ead.git
cd unitec-ead/frontend
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configure as Variáveis de Ambiente

```bash
cp .env.example .env.local
```

Edite `.env.local` com suas chaves:

```env
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://user:password@host:5432/unitec_ead"

# Clerk Authentication (https://dashboard.clerk.com)
CLERK_SECRET_KEY="sk_test_xxx"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_xxx"

# Webhook do Clerk (opcional, para sincronizar usuários)
CLERK_WEBHOOK_SECRET="whsec_xxx"

# YouTube API (opcional)
YOUTUBE_API_KEY="AIza..."

# Environment
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Configurar Clerk

#### Criar Conta no Clerk
1. Acesse https://clerk.com
2. Crie uma conta
3. Vá para [Dashboard](https://dashboard.clerk.com)
4. Crie uma nova aplicação (Application)

#### Obter Chaves
1. No Dashboard, vá para **Developers** → **API Keys**
2. Copie:
   - `CLERK_SECRET_KEY` (Backend)
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (Frontend)
3. Cole em `.env.local`

#### Configurar Provedores OAuth (opcional)
1. Vá para **User & Authentication** → **Social connections**
2. Ative Google, GitHub, etc.

#### Configurar Webhook (opcional, para sincronizar usuários)
1. Vá para **Webhooks**
2. Clique em **Create New**
3. URL: `https://seu-dominio.com/api/webhooks/clerk`
4. Selecione eventos: `user.created`, `user.updated`, `user.deleted`
5. Copie a **Signing secret** em `CLERK_WEBHOOK_SECRET`

### 5. Configurar Banco de Dados

#### Criar Banco no Neon
1. Acesse https://neon.tech
2. Crie um projeto
3. Copie a **Connection String** (com password)
4. Cole em `DATABASE_URL`

#### Gerar e Fazer Push do Schema
```bash
npm run db:generate  # Gera migrações
npm run db:push     # Aplica no banco
```

### 6. Inicie o Servidor de Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em: **http://localhost:3000**

---

## 📚 Estrutura do Projeto

```
.
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout com ClerkProvider
│   │   ├── page.tsx                      # Landing page
│   │   ├── (auth)/
│   │   │   ├── sign-in/[[...sign-in]]/   # Página de login
│   │   │   └── sign-up/[[...sign-up]]/   # Página de cadastro
│   │   ├── dashboard/
│   │   │   └── page.tsx                  # Dashboard (rota protegida)
│   │   ├── api/
│   │   │   ├── webhooks/clerk/           # Webhook de sincronização
│   │   │   └── protected/me/             # API protegida de exemplo
│   │   ├── globals.css                   # Estilos globais
│   │   └── PROTECTED_ROUTES_GUIDE.md     # Guia para rotas protegidas
│   │
│   ├── components/
│   │   ├── Header.tsx                    # Header com navegação
│   │   └── UserButtonWrapper.tsx         # Wrapper do UserButton
│   │
│   ├── lib/
│   │   └── auth.ts                       # Utilitários de autenticação
│   │
│   └── db/
│       ├── index.ts                      # Conexão com DB
│       └── schema.ts                     # Schema das tabelas
│
├── public/                               # Arquivos estáticos
├── middleware.ts                         # Proteção de rotas
├── next.config.ts                        # Configuração Next.js
├── tailwind.config.ts                    # Configuração Tailwind
├── tsconfig.json                         # Configuração TypeScript
├── .env.example                          # Exemplo de .env
├── .env.local                            # Variáveis (NÃO COMMITAR)
├── package.json                          # Dependências
├── CLERK_SETUP.md                        # Guia de setup do Clerk
└── README.md                             # Este arquivo
```

---

## 🔐 Autenticação

### Como Funciona

1. **Clerk** gerencia autenticação e sessões
2. **Middleware** protege rotas automaticamente
3. **Banco de dados** sincroniza dados de usuários

### Rotas Protegidas

```
/dashboard/*      - Dashboard (requer login)
/course/*         - Cursos (requer login)
/playlist/*       - Playlists (requer login)
/profile/*        - Perfil (requer login)
/api/protected/*  - APIs protegidas (requer login)
```

### Rotas Públicas

```
/                 - Home
/sign-in          - Login
/sign-up          - Cadastro
/api/webhooks/*   - Webhooks
/api/public/*     - APIs públicas
```

### Acessar Dados do Usuário

#### Em Páginas Server-Side

```tsx
import { currentUser } from "@clerk/nextjs/server";

export default async function MyPage() {
  const user = await currentUser();
  
  return <p>Olá, {user?.firstName}!</p>;
}
```

#### Em Componentes Cliente

```tsx
"use client";

import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";

export function MyComponent() {
  const { user } = useUser();
  
  return (
    <>
      <SignedIn>
        <p>Olá, {user?.firstName}!</p>
      </SignedIn>
      <SignedOut>
        <p>Faça login para continuar</p>
      </SignedOut>
    </>
  );
}
```

---

## 💾 Database

### Schema

Tabelas principais em `src/db/schema.ts`:

- **users** - Usuários (sincronizados com Clerk)
- **categories** - Categorias de cursos
- **curated_courses** - Cursos estruturados
- **video_items** - Vídeos do YouTube
- **user_progress** - Progresso do aluno
- **user_playlists** - Playlists do usuário

### Migrations

```bash
# Gerar nova migration
npm run db:generate

# Fazer push para o banco
npm run db:push

# Visualizar schema
npm run db:studio  # (se drizzle-studio estiver instalado)
```

---

## 📖 Documentação

- **[CLERK_SETUP.md](./CLERK_SETUP.md)** - Guia completo de autenticação com Clerk
- **[src/app/PROTECTED_ROUTES_GUIDE.md](./src/app/PROTECTED_ROUTES_GUIDE.md)** - Como adicionar rotas protegidas
- **[Clerk Docs](https://clerk.com/docs)** - Documentação oficial
- **[Next.js Docs](https://nextjs.org/docs)** - Documentação do Next.js

---

## 🧪 Testando a Autenticação

### 1. Landing Page
```
http://localhost:3000
```
- Botão "Começar a aprender" redireciona para login (se não autenticado)
- Botão "Ir para Dashboard" se autenticado

### 2. Sign Up
```
http://localhost:3000/sign-up
```
- Criar nova conta
- Será sincronizado automaticamente com o banco

### 3. Dashboard
```
http://localhost:3000/dashboard
```
- Rota protegida - só acessível se autenticado
- Exibe dados do usuário

### 4. API Protegida
```bash
curl http://localhost:3000/api/protected/me \
  -H "Authorization: Bearer <token>"
```

---

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Build para produção
npm start            # Inicia servidor de produção

# Database
npm run db:generate  # Gera migrations
npm run db:push      # Faz push do schema para o banco

# Linting
npm run lint         # Verifica código com ESLint
```

---

## 🎨 Customização

### Tema de Cores

As cores principais estão em:
- `tailwind.config.ts` - Configuração de cores
- `src/app/globals.css` - Variáveis de CSS

Cores atuais:
- **Primária**: Blue 600
- **Secundária**: Purple
- **Background**: Slate 950
- **Texto**: Slate 50

### Componentes

Componentes principais:
- `Header.tsx` - Navegação e branding
- `UserButtonWrapper.tsx` - Menu do usuário
- Páginas de autenticação em `(auth)/`

---

## 🚀 Deployment

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

**Configurar variáveis de ambiente:**
1. Vá para Project Settings
2. Environment Variables
3. Adicione todas as chaves de `.env.local`

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/melhoria`)
3. Commit suas mudanças (`git commit -m 'Adiciona melhoria'`)
4. Push para a branch (`git push origin feature/melhoria`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto é licenciado sob a MIT License - veja [LICENSE](LICENSE) para detalhes.

---

## 📞 Suporte

- **Documentação**: [CLERK_SETUP.md](./CLERK_SETUP.md)
- **Issues**: [GitHub Issues](https://github.com/seu-usuario/unitec-ead/issues)
- **Email**: suporte@unitec-ead.com

---

## 🎯 Próximos Passos

- [ ] Implementar página de catálogo de cursos
- [ ] Criar player de vídeo integrado
- [ ] Implementar sistema de progresso
- [ ] Adicionar comentários em vídeos
- [ ] Criar dashboard de instructor
- [ ] Implementar certificados
- [ ] Adicionar sistema de pontos/gamificação
- [ ] Otimizar performance

---

**Última atualização**: 04/04/2026  
**Versão**: 0.1.0
