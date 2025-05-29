
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
    git clone [https://github.com/Michael-Arrais/educash-beta.git](https://github.com/Michael-Arrais/educash-beta.git)
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

```text
educash-beta/
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
├── README.md               # 📖 Documentação (Este Arquivo!)
├── tailwind.config.js      # 🌬️ Tailwind Config
├── tsconfig.json           # 🇹🇸 TypeScript Config
├── tsconfig.node.json      # 🇹🇸 TS Node Config
└── vite.config.ts          # ⚡ Vite Config
```

## 🔹 Explicação Detalhada (Incluindo Novas Pastas):

**public/:** Contém arquivos estáticos servidos diretamente.

**src/:** O coração da aplicação.

**assets/:** Para imagens, fontes, etc., que são importados e processados.

**components/:** Fundamental para React. Armazena seus componentes de UI reutilizáveis. Pode ser subdividida (ex: ui/, layout/, features/) para melhor organização. Cada componente aqui deve ser o mais independente possível.

**contexts/:** Onde você define seus Contextos da React Context API. Cada arquivo aqui geralmente exporta um Context e um Provider para compartilhar estado (como informações do usuário logado, tema da aplicação) sem precisar passar props por múltiplos níveis.

**hooks/:** Para criar seus próprios Hooks customizados. Se você tem uma lógica que se repete em vários componentes (como buscar dados de uma API, interagir com o localStorage), você pode extraí-la para um Hook customizado (ex: useUserData, useApi) e reutilizá-la facilmente.

**integrations/ (ou services/ ou api/):** Centraliza a lógica de comunicação com serviços externos. É aqui que você colocaria suas funções para fazer chamadas a APIs REST/GraphQL, configurar clientes HTTP (como Axios ou Fetch wrappers), ou interagir com SDKs de terceiros (Firebase, Stripe, etc.).

**lib/ (ou utils/):** Uma pasta para "utilitários" – funções auxiliares genéricas, constantes, formatações (datas, moedas), lógica de validação, ou qualquer código que não seja um componente, hook ou serviço, mas que seja útil em várias partes do projeto.

**styles/:** Estilos globais e, principalmente, o index.css para importar o Tailwind.

**App.tsx:** O componente raiz que organiza a aplicação.

**main.tsx:** O ponto de entrada que renderiza o App.

**Arquivos de Configuração: vite.config.ts, tailwind.config.js, postcss.config.js, tsconfig.json, .eslintrc.cjs** definem como as ferramentas (*Vite, Tailwind, TypeScript, ESLint*) devem se comportar.

**Outros: index.html, package.json, .gitignore, README.md** são arquivos padrão de projetos web e Node.js.

## 🤝 Como Contribuir

Sua ajuda é muito bem-vinda! Se você tem ideias para melhorar o Fin.AI, siga estes passos:

1.  **Faça um Fork:** Crie sua própria cópia do projeto.
2.  **Crie um Branch:** `git checkout -b feature/sua-incrivel-ideia`
3.  **Desenvolva:** Implemente sua melhoria.
4.  **Faça Commit:** `git commit -m 'feat: Adiciona funcionalidade X'` (Use [Commits Semânticos](https://www.conventionalcommits.org/en/v1.0.0/))
5.  **Envie:** `git push origin feature/sua-incrivel-ideia`
6.  **Abra um Pull Request:** Descreva sua contribuição e envie para revisão.

---

## 📄 Licença

Este projeto é orgulhosamente distribuído sob a **Licença MIT**. Sinta-se livre para usar, modificar e distribuir.

---

**Desenvolvido com ☕ por alunos do CETI PROF PINHEIRO MACHADO e colaboradores.**