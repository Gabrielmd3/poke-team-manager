# ⚡ PokeTeam Manager API

Uma API RESTful desenvolvida em **Nest.JS** para gerenciar Treinadores e seus respectivos times de Pokémon, integrada com a **PokéAPI** oficial e persistência de dados em **PostgreSQL** via Docker.

## 🛠️ Tecnologias Utilizadas

* **Framework:** Nest.JS (TypeScript)
* **Banco de Dados:** PostgreSQL (via Docker)
* **ORM:** TypeORM
* **Integração Externa:** Axios (@nestjs/axios)
* **Documentação:** Swagger (OpenAPI)
* **Validação:** class-validator & class-transformer

## 🏗️ Decisões de Arquitetura e Padrões (O Diferencial)

Este projeto foi estruturado seguindo as melhores práticas do ecossistema Nest.JS, focando em separação de responsabilidades (SOLID) e escalabilidade:

1. **Arquitetura em Camadas (Domain-Driven Design leve):** * **Controllers:** Responsáveis apenas por receber as requisições HTTP e rotear para os serviços.
   * **Services:** Concentram toda a regra de negócio (ex: validação de limite de 6 Pokémons por time).
   * **Repositories:** Camada exclusiva criada para isolar as consultas ao TypeORM. O Service não interage diretamente com o ORM, garantindo baixo acoplamento.
2. **Isolamento de API Externa:** Foi criado um módulo dedicado (`external/poke-api`) para consumir a PokéAPI. Se a API do Pokémon mudar amanhã, apenas este serviço precisará ser refatorado, protegendo o domínio principal da aplicação.
3. **Data Transfer Objects (DTOs):** Uso rigoroso de DTOs para blindar a aplicação contra injeção de dados indevidos (usando `ValidationPipe` global com `whitelist: true`). As entidades do banco nunca são expostas ou inseridas diretamente pelas rotas.

## 🚀 Como Executar o Projeto

Certifique-se de ter o **Docker** e o **Node.js (v18+)** instalados na sua máquina.

**1. Clone o repositório e instale as dependências**

```bash
git clone <seu-link-do-git>
cd poke-team-manager
npm install
