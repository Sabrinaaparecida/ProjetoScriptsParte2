Este projeto foi desenvolvido com foco em arquitetura MVC, segurança e boas práticas de desenvolvimento com TypeScript.

## 🛠️ Tecnologias Utilizadas

* **Backend:** Node.js, Express.js (TypeScript)
* **Frontend:** EJS (Embedded JavaScript), Bootstrap 5, CSS
* **Banco de Dados:** SQLite (com ORM Sequelize)
* **Autenticação:** JWT (JSON Web Tokens) via Cookies & Bcrypt
* **DevOps:** Docker & Docker Compose
* **Testes:** Jest

## ✨ Funcionalidades

* ✅ **Autenticação Segura:** Login e Cadastro com senhas criptografadas.
* ✅ **Proteção de Rotas:** Middleware que impede acesso não autorizado usando JWT.
* ✅ **Gestão de Perfil:** Dashboard personalizado com dados do usuário.
* ✅ **CRUD de Currículo:** Criação, leitura e atualização de currículos com dados profissionais e acadêmicos.

## ⚙️ Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:
* [Node.js](https://nodejs.org/) (v18 ou superior)
* [Docker](https://www.docker.com/) (Opcional, mas recomendado)

### Opção 1: Rodando com Docker

A maneira mais fácil de rodar a aplicação é utilizando o Docker Compose, que configura o banco de dados e o ambiente automaticamente.

1.  Clone o repositório e entre na pasta.
2.  O arquivo `.env` foi incluído no repositório intencionalmente para facilitar a execução e testes.
3.  Execute o comando: docker-compose up --build
4.  Acesse http://localhost:3000.

### Opção 2: Rodando Localmente (Sem Docker)

1.  Clone o repositório e entre na pasta.
2.  Instale as dependências: npm install.
3.  Rode o projeto: npm run dev - Este comando compila o TypeScript em tempo real, copia os assets (views/css) e inicia o servidor.
4.  Acesse http://localhost:3000.

🧪 Rodando Testes
O projeto possui testes unitários configurados com Jest. Para executá-los:
npm test.






