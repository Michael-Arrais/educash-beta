
# INFORMAÇÕES PROJETO EDUCASH 🤖💰

Bem-vindo ao **EduCash**, sua plataforma inteligente para gerenciamento e planejamento financeiro! Este projeto foi desenvolvido para ajudar estudantes que recebem benefícios governamentais a organizar suas finanças, definir metas e receber insights personalizados com a ajuda de um assistente de inteligência artificial (CASHIA).

## 📜 Visão Geral

O EduCash é uma aplicação web moderna construída com **React**, **TypeScript** e **TailwindCSS**, utilizando o **Vite** como *bundler* para um desenvolvimento rápido e eficiente. A plataforma oferece uma interface intuitiva e responsiva para que você possa controlar suas finanças de qualquer lugar.

## ✨ Funcionalidades Principais

* **Dashboard Financeiro:** Visualize um resumo completo de suas receitas, despesas, saldo atual e progresso em direção às metas.
* **Gerenciamento de Transações:** Adicione, edite e categorize facilmente suas transações diárias.
* **Definição de Metas:** Crie metas financeiras (curto, médio e longo prazo) e acompanhe seu progresso.
* **Orçamentos:** Estabeleça orçamentos por categoria e receba alertas quando estiver próximo de atingir os limites.
* **Relatórios e Gráficos:** Analise seus padrões de gastos e receitas com gráficos interativos.
* **Insights com IA (CashIA):** Receba dicas e sugestões personalizadas para otimizar suas finanças.

## 🚀 Tecnologias Utilizadas (Versão Original)

* **Frontend:** React
* **Linguagem:** TypeScript
* **Estilização:** TailwindCSS
* **Build Tool:** Vite
* **Gerenciador de Pacotes:** NPM / Yarn

## 🛠️ Instalação e Execução

Siga os passos abaixo para executar o projeto localmente:

1.  **Clone o Repositório:**
    ```bash
    git clone [https://github.com/Michael-Arrais/finai-future-focus.git](https://github.com/Michael-Arrais/finai-future-focus.git)
    cd finai-future-focus
    ```

2.  **Instale as Dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Execute o Servidor de Desenvolvimento:**
    ```bash
    npm run dev
    # ou
    yarn dev
    ```

4.  **Acesse a Aplicação:**
    Abra seu navegador e acesse `http://localhost:8080` (ou a porta indicada pelo Vite).

## 📂 Estrutura do Projeto (React + TypeScript + TailwindCSS)

Entender a organização do código é fundamental para contribuir e manter o projeto. Adotamos uma estrutura baseada em funcionalidades e tipos de arquivos, visando a clareza e escalabilidade:

finai-future-focus/
├── public/                 # 🏞️ Arquivos Estáticos (Favicons, etc.)
├── src/                    # 📁 Código Fonte Principal
│   ├── assets/             # 🎨 Ativos Processados (Imagens, fontes)
│   ├── components/         # 🧩 Componentes Reutilizáveis (Botões, Cards, Layouts)
│   ├── contexts/           # 🌐 Contextos React (Gerenciamento de estado global/compartilhado)
│   ├── hooks/              # 🎣 Hooks Personalizados (Lógica reutilizável, ex: useFetch)
│   ├── integrations/       # 🔗 Integrações / Serviços (Chamadas API, SDKs externos)
│   ├── lib/                # 📚 Biblioteca / Utilitários (Funções auxiliares, constantes)
│   ├── styles/             # 💅 Estilos Globais (index.css com Tailwind)
│   ├── App.tsx             # ⚙️ Componente Principal da Aplicação
│   ├── main.tsx            # 🚀 Ponto de Entrada (Inicialização do React)
│   └── vite-env.d.ts       # 📄 Tipos do Vite
├── .eslintrc.cjs           #  Linter (ESLint)
├── .gitignore              # 🚫 Git Ignore
├── index.html              # 📄 HTML Principal
├── package.json            # 📦 Pacotes e Scripts
├── package-lock.json       # 🔗 Trava de Pacotes
├── postcss.config.js       # 🖌️ PostCSS Config
├── README.md               # 📖 Documentação
├── tailwind.config.js      # 🌬️ Tailwind Config
├── tsconfig.json           # 🇹🇸 TypeScript Config
├── tsconfig.node.json      # 🇹🇸 TS Node Config
└── vite.config.ts          # ⚡ Vite Config