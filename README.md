# ⚡ PokeTeam Manager API

# ⚡ PokeTeam Manager API

Uma API RESTful desenvolvida em **Nest.JS** para gerenciar Treinadores e seus respectivos times de Pokémon, integrada com a **PokéAPI** oficial e persistência de dados em **PostgreSQL** via Docker.

## 🛠️ Tecnologias Utilizadas

* **Framework:** Nest.JS (TypeScript)
* **Banco de Dados:** PostgreSQL (via Docker)
* **ORM:** TypeORM
* **Autenticação:** JWT (JSON Web Token) & Passport
* **Segurança:** Criptografia de senhas com Bcrypt
* **Integração Externa:** Axios (@nestjs/axios)
* **Documentação:** Swagger (OpenAPI)
* **Validação:** class-validator & class-transformer

## 🏗️ Decisões de Arquitetura e Padrões (O Diferencial)

Este projeto foi estruturado seguindo as melhores práticas do ecossistema Nest.JS, focando em separação de responsabilidades (SOLID), segurança e escalabilidade:

1. **Arquitetura em Camadas (Domain-Driven Design leve):**
   * **Controllers:** Responsáveis apenas por receber as requisições HTTP, validar as entradas e rotear para os serviços.
   * **Services:** Concentram toda a regra de negócio (ex: validação de limite de 6 Pokémons por time e checagem de senhas).
   * **Repositories:** Camada exclusiva criada para isolar as consultas ao TypeORM. O Service não interage diretamente com o ORM, garantindo baixo acoplamento.

2. **Segurança e Autenticação Robusta:**
   * Implementação de fluxo de autenticação utilizando **JWT** e estratégias do **Passport**.
   * Proteção de rotas críticas usando `AuthGuards` personalizados.
   * Armazenamento seguro de senhas utilizando hash criptográfico gerado pelo **Bcrypt**, garantindo que senhas em texto limpo nunca sejam salvas.

3. **Isolamento de API Externa:** Foi criado um módulo dedicado (`external/poke-api`) para consumir a PokéAPI. Se a API do Pokémon mudar amanhã, apenas este serviço precisará ser refatorado, protegendo o domínio principal da aplicação.

4. **Data Transfer Objects (DTOs):** Uso rigoroso de DTOs para blindar a aplicação contra injeção de dados indevidos (usando `ValidationPipe` global com `whitelist: true`). As entidades do banco nunca são expostas ou inseridas diretamente pelas rotas.

## 🚀 Como Executar o Projeto

Certifique-se de ter o **Docker** e o **Node.js (v18+)** instalados na sua máquina.

**1. Clone o repositório e instale as dependências**

```bash
git clone [https://github.com/Gabrielmd3/poke-team-manager.git](https://github.com/Gabrielmd3/poke-team-manager.git)
cd poke-team-manager
npm install
```

**2. Configure as Variáveis de Ambiente**

Crie um arquivo `.env` na raiz do projeto (`poke-team-manager/.env`) e adicione as seguintes credenciais:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=pokeuser
DB_PASSWORD=pokepassword
DB_DATABASE=pokedb
```

**3. Suba o Banco de Dados com Docker**

```
docker-compose up -d
```

**4. Inicie o Servidor Nest.JS**
```
# Modo de desenvolvimento
npm run start:dev
```

## 🔒 Fluxo de Autenticação e Testes (Swagger)

Com a aplicação rodando, acesse a interface interativa do Swagger para testar todos os endpoints:

👉 http://localhost:3000/api/docs

Para testar as rotas protegidas (como o gerenciamento de times), siga o fluxo abaixo:

    Cadastro: Vá no endpoint POST /trainers e crie um novo treinador informando nome, cidade, email e senha.

    Login: Acesse POST /auth/login com as credenciais criadas. O servidor retornará um access_token (JWT). Copie esse token.

    Autenticação no Swagger: Clique no botão verde Authorize (no topo direito da tela do Swagger) ou no ícone de cadeado das rotas protegidas, cole o token no campo de valor e confirme.

    Uso: Agora todas as rotas protegidas do bloco de Teams estarão liberadas para uso automático através do token injetado no cabeçalho das requisições.

---
*Desenvolvido como case técnico para avaliação de Backend.*
