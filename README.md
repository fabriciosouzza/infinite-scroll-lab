# Desafio Técnico – Listagem com Scroll Infinito

Este repositório contém a solução desenvolvida para o desafio técnico da Teceo, que consiste em:

* Uma listagem com scroll infinito
* Ações individuais em cada item
* Ações em massa com pré-visualização de seleção

---

## 🛠️ Stack Utilizada

* **Frontend:** Next.js (React) + Material UI + SWR + React Virtuoso
* **Backend:** NestJS + MikroORM
* **Banco de Dados:** PostgreSQL (via Docker)

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

* Docker
* Yarn (ou outro gerenciador de pacotes)
* Arquivo `.env` na raiz do frontend contendo:

  ```env
  NEXT_PUBLIC_NEST_API_URL=http://localhost:3001
  ```

### 1. Subir os containers

```bash
docker compose up
```

### 2. Gerar e aplicar migrations

Caso não tenha o CLI do MikroORM instalado localmente, acesse o container do backend:

```bash
docker exec -it <backend_container_name> sh
```

Dentro do container, execute:

```bash
yarn migration:create
yarn migration:up
```

### 3. Preparar o banco de dados e seed

Ainda no mesmo container:

> **Obs:** os dados de exemplo são gerados com **Faker.js**

```bash
yarn seed
```

---

## 🔍 Funcionalidades

* **Scroll infinito** na listagem de itens
* **Ação individual:** editar nome ao clicar e salvar em `onBlur`
* **Seleção múltipla** de itens para ação em massa
* **Modal de pré-visualização** antes de confirmar ação em massa
* **API REST** estruturada em NestJS com MikroORM