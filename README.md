# BrainAg - API de Gestão de Produtores, Fazendas e Safras

Este projeto é uma API construída com [NestJS](https://nestjs.com/) como teste técnico para a posição de Backend Developer na Brain-Ag. Ele permite gerenciar **produtores rurais**, **fazendas** e **safras** de forma estruturada.

## ✅ Pré-requisitos

Você deve estar utilizando **Ubuntu 24.04 LTS** e possuir os seguintes softwares instalados:

- **Node.js** `v20+`
- **npm** `v10+`
- **Docker** e **Docker Compose**

Para instalar Node.js e npm:

```bash
sudo apt update
sudo apt install curl -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
---
```

Para instalar Docker e docker compose:

```bash
sudo apt install docker.io docker-compose -y
newgrp docker
sudo usermod -aG docker $USER
---


## 📦 Instalação de Pacotes

Com o repositório clonado, instale as dependências:

```bash
npm install
```

---

## 🚀 Rodando a Aplicação Localmente

```bash
npm run deploy
```

---

## 📚 Acessando a Documentação da API (Swagger)

Com a aplicação rodando localmente, acesse:

```
http://localhost:3000/api
```

A documentação interativa é gerada automaticamente com **Swagger** e permite testar todas as rotas.

---

## 🌐 Endpoints da API

### 🔸 PRODUTORES (`/produtores`)

| Método | Rota                         | Descrição                                               |
|--------|------------------------------|---------------------------------------------------------|
| GET    | `/produtores`               | Lista todos os produtores cadastrados                   |
| GET    | `/produtores/:id`           | Retorna os dados de um produtor específico              |
| POST   | `/produtores`               | Cria um novo produtor                                   |
| PUT    | `/produtores/:id`           | Atualiza um produtor existente                          |
| DELETE | `/produtores/:id`           | Remove um produtor pelo ID                              |
| GET    | `/produtores/:id/fazendas`  | Lista as fazendas associadas a um produtor              |

**Body do POST/PUT**:

```json
{
  "cpf_cnpj": "123.456.789-09",
  "nome": "João da Silva"
}
```

### 🔸 FAZENDAS (`/fazendas`)

| Método | Rota                                 | Descrição                                                  |
|--------|--------------------------------------|------------------------------------------------------------|
| GET    | `/fazendas`                         | Lista todas as fazendas cadastradas                        |
| GET    | `/fazendas/:id`                     | Retorna os dados de uma fazenda específica                 |
| POST   | `/fazendas`                         | Cria uma nova fazenda                                      |
| PUT    | `/fazendas/:id`                     | Atualiza os dados de uma fazenda existente                 |
| DELETE | `/fazendas/:id`                     | Remove uma fazenda pelo ID                                 |
| GET    | `/fazendas/:id/safras`              | Lista todas as safras associadas a uma fazenda             |
| GET    | `/fazendas/:id/safras/:ano`         | Lista safras de uma fazenda em um determinado ano          |

**Body do POST/PUT**:

```json
{
  "nome": "Fazenda Primavera",
  "cidade": "Londrina",
  "estado": "PR",
  "area_total": 100,
  "area_agricultavel": 75,
  "area_vegetacao": 25,
  "produtor_id": "uuid-do-produtor"
}
```

### 🔸 SAFRAS (`/safra`)

| Método | Rota                | Descrição                                            |
|--------|---------------------|------------------------------------------------------|
| GET    | `/safra`            | Lista todas as safras cadastradas                   |
| GET    | `/safra/:id`        | Retorna os dados de uma safra específica            |
| POST   | `/safra`            | Cria uma nova safra                                 |
| PUT    | `/safra/:id`        | Atualiza os dados de uma safra existente            |
| DELETE | `/safra/:id`        | Remove uma safra pelo ID                            |

**Body do POST/PUT**:

```json
{
  "ano": 2023,
  "cultura": "Soja",
  "area": 50,
  "fazenda_id": "uuid-da-fazenda"
}
```

---

## 🧑‍💻 Autor

**Marcus Vinícius Martins Meneses**
