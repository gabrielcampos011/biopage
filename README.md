<div align="center">
<img width="1200" height="475" alt="App Biopage" src="[https://ibb.co/fVcgWPYj" />
</div>

🔗 BioPage: Seu Link Único e Personalizado (Estilo Linktree)

🌟 Visão Geral do Projeto

O BioPage é uma solução moderna, rápida e altamente personalizável para criar sua página de "Link na Bio". Desenvolvido com uma arquitetura Full-Stack moderna, o projeto foca em desempenho, segurança e uma experiência de usuário (UX) sofisticada.

Este aplicativo é um MVP (Produto Mínimo Viável) que demonstra a eficiência do desenvolvimento Agent-First (assistido por IA).

✨ Funcionalidades Principais

Páginas Públicas Dinâmicas: Cada usuário possui um link exclusivo (biopage.app/username).

Sistema de Temas (Customização Linktree): O usuário pode selecionar diferentes temas visuais (Dark Galaxy, Neon, Gradientes) no painel de controle, que são aplicados instantaneamente na sua página pública.

Segurança (RLS): Uso de Row-Level Security no Supabase para garantir que cada usuário apenas visualize e edite seus próprios links e perfil.

UX Refinada: Layouts centralizados, responsivos e ícones sociais automáticos nos links.

💻 Stack Tecnológica

O BioPage foi construído sobre uma das stacks mais modernas e produtivas do mercado:

Categoria

Tecnologia

Uso Principal

Frontend/Framework

React / Next.js

Construção da interface de usuário e roteamento.

Backend/Database

Supabase (PostgreSQL)

Banco de dados, Autenticação (Auth), RLS e APIs.

Estilização

Tailwind CSS

Design responsivo, temas e classes de utilidade.

Ferramenta de Desenvolvimento

Google Antigravity / Gemini 3.0

Desenvolvimento Agent-First e automatizado de código (vibe coding).

Contexto

Supabase MCP (Model Context Protocol)

Permite que o Gemini acesse o schema do banco de dados em tempo real.

Deploy

Vercel

Hospedagem e distribuição contínua.

🚀 Como Rodar o Projeto Localmente

Pré-requisitos: Você deve ter Node.js (versão 18+) instalado.

Instalar Dependências:

npm install


Configurar Variáveis de Ambiente:
Crie um arquivo chamado .env.local na raiz do projeto e adicione suas chaves:

# Chave para o Gemini (caso a aplicação use alguma chamada direta à API)
GEMINI_API_KEY="SUA_CHAVE_GEMINI"

# Credenciais do Supabase
NEXT_PUBLIC_SUPABASE_URL="SUA_URL_DO_PROJETO"
NEXT_PUBLIC_SUPABASE_ANON_KEY="SUA_CHAVE_ANON"

# Nota: O agente Antigravity / MCP usa chaves separadas para gestão de schema.


Rodar a Aplicação:

npm run dev


O aplicativo estará acessível em http://localhost:3000.

⚙️ Arquitetura de Segurança (RLS e Supabase)

O BioPage utiliza o RLS para garantir a privacidade dos dados:

profiles e links: As políticas RLS garantem que um usuário logado (auth.uid()) só possa visualizar, criar ou modificar o conteúdo (links) associado ao seu próprio ID de usuário.

Páginas Públicas: O RLS é configurado para permitir que qualquer pessoa (usuário anônimo) possa fazer SELECT na página de links de um usuário, mas nunca UPDATE ou DELETE.
