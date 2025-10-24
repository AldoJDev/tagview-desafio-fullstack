# TagProducts - Desafio FullStack Tagview

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring](https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

Este repositório contém a solução completa para o desafio técnico da **Tagview** para a posição de Desenvolvedor FullStack.

O projeto consiste em uma aplicação web para gerenciamento de produtos, composta por uma API RESTful construída com **Java 21/Spring Boot 3** e um frontend interativo desenvolvido com **React + TypeScript**. Todo o ambiente é orquestrado com **Docker**, visando a simplicidade na execução e a consistência entre os ambientes.


## ✨ Features Implementadas

### 🎨 Frontend

#### Listagem de Produtos (`/produtos/exibir`)
- ✅ **Exibição em Cards:** Produtos exibidos em grid responsivo com imagem, nome e preço
- ✅ **Sistema de Paginação:** Navegação entre páginas com botões numerados
- ✅ **Seleção de Limite:** Opções para exibir 10, 20, 50 ou Todos os produtos por página
- ✅ **Modal de Detalhes:** Clique no card para visualizar detalhes completos (imagem, nome, preço e descrição)
- ✅ **Query Param `idProduto`:** Abertura automática do modal ao acessar com `?idProduto=UUID`
- ✅ **Fallback de Imagem:** Placeholder visual para produtos sem imagem cadastrada
- ✅ **Loading State:** Indicador visual durante carregamento dos dados
- ✅ **Tratamento de Erros:** Mensagens amigáveis em caso de falha na API
- ✅ **Design Responsivo:** Interface adaptável para desktop, tablet e mobile

#### Cadastro de Produtos (`/produtos/cadastro`)
- ✅ **Formulário Completo:** Campos para nome, preço, descrição e imagem
- ✅ **Validação Frontend:** 
  - Nome: 3-50 caracteres, obrigatório
  - Preço: mínimo R$ 10,00, obrigatório
  - Descrição: 30-255 caracteres, obrigatório
  - Imagem: máximo 5MB, PNG ou JPG, opcional
- ✅ **Preview de Imagem:** Visualização da imagem antes do envio
- ✅ **Feedback de Erros:** Exibição clara de erros de validação (frontend e backend)
- ✅ **Redirecionamento Inteligente:** Após sucesso, redireciona para listagem com modal aberto no produto recém-cadastrado
- ✅ **Mensagem de Sucesso:** Alert informando "Novo Produto Cadastrado!"
- ✅ **Upload de Imagem:** Conversão automática para Base64
---

### ⚙️ Backend

#### Endpoints da API

**`GET /api/v1/produtos`** - Listar Produtos
- Retorna todos os produtos cadastrados
- Delay artificial de 3 segundos
- Requer header `X-API-KEY: tagview-desafio-2024`
- Response: Array de produtos com estrutura completa

**`POST /api/v1/produtos`** - Criar Produto
- Cadastra novo produto no sistema
- Delay artificial de 3 segundos
- Requer header `X-API-KEY: tagview-desafio-2024`
- **Validações Implementadas:**
  - Nome: 3-50 caracteres, obrigatório
  - Preço: mínimo R$ 10,00, obrigatório
  - Descrição: 30-255 caracteres, obrigatório
  - Imagem: máximo 2MB (backend), Base64, PNG/JPG, opcional
  - Validação de formato: Magic numbers para PNG e JPEG
- **Responses:**
  - `200`: Produto criado com sucesso (retorna objeto completo com UUID)
  - `422`: Erro de validação (retorna array de erros)
  - `401`: API Key inválida ou ausente
  - `500`: Erro interno do servidor

**`GET /api/v1/produtos/test`** - Health Check
- Endpoint de teste para verificar status da API
- Response: `"okok"`

#### Recursos do Backend
- ✅ **Spring Boot 3.5.6:** Framework robusto e moderno
- ✅ **Java 21:** Versão LTS mais recente
- ✅ **PostgreSQL:** Banco de dados relacional
- ✅ **Spring Data JPA:** Persistência simplificada
- ✅ **Bean Validation:** Validações declarativas
- ✅ **Lombok:** Redução de boilerplate
- ✅ **SpringDoc OpenAPI:** Documentação automática (Swagger)
- ✅ **CORS Configurado:** Permite acesso do frontend
- ✅ **Timestamps Automáticos:** `criadoEm` e `atualizadoEm` em cada produto
- ✅ **UUID como ID:** Identificadores únicos universais
- ✅ **Tratamento de Exceções:** Respostas padronizadas para erros
- ✅ **Validação de Imagem Base64:** Decodificação e verificação de tamanho/formato
- ✅ **Magic Numbers Validation:** Verifica se imagem é realmente PNG ou JPEG

#### Documentação Swagger
- ✅ **Interface Interativa:** Teste todos os endpoints pelo navegador
- ✅ **Autenticação Configurada:** Suporte para X-API-KEY
- ✅ **Exemplos Completos:** Request e response bodies documentados
- ✅ **Schemas Detalhados:** Descrição de todos os campos e validações
- ✅ **Códigos de Status:** Documentação de todos os cenários possíveis
- ✅ **Try It Out:** Execute requisições diretamente no Swagger UI

---

## 🗄️ Banco de Dados

### Estrutura da Tabela `produtos`

| Campo | Tipo | Restrições | Descrição |
|-------|------|------------|-----------|
| `id` | UUID | PK, Not Null | Identificador único do produto |
| `nome` | VARCHAR(50) | Not Null | Nome do produto |
| `preco` | DECIMAL(10,2) | Not Null | Preço em reais |
| `descricao` | VARCHAR(255) | Not Null | Descrição completa |
| `imagem` | TEXT | Nullable | Imagem em Base64 |
| `criado_em` | TIMESTAMP | Not Null | Data/hora de criação |
| `atualizado_em` | TIMESTAMP | Not Null | Data/hora da última atualização |

---

## 🛠️ Stack de Tecnologias

### Backend
- **Java 21** - Linguagem de programação (LTS)
- **Spring Boot 3.5.6** - Framework principal
- **Spring Data JPA** - Persistência de dados
- **Spring Validation** - Validação de dados
- **SpringDoc OpenAPI 2.5.0** - Documentação Swagger
- **Lombok** - Redução de boilerplate
- **PostgreSQL Driver** - Conexão com banco de dados
- **Maven** - Gerenciamento de dependências

### Frontend
- **React 18** - Biblioteca UI
- **TypeScript** - Superset tipado do JavaScript
- **Tailwind CSS** - Framework de estilização
- **Vite** - Build tool e dev server

### Infraestrutura
- **PostgreSQL** - Banco de dados relacional
- **Docker** - Containerização
- **Docker Compose** - Orquestração de containers

---

## ⚙️ Como Executar o Projeto Localmente

### Pré-requisitos
- **Git** instalado
- **Docker** e **Docker Compose** instalados
- Porta **3000** (frontend) e **4000** (backend) disponíveis
- Porta **5432** (PostgreSQL) disponível

### Passo a Passo

**1. Clone o Repositório:**
```bash
git clone https://github.com/AldoJDev/tagview-desafio-fullstack.git
```

**2. Navegue até a Pasta do Projeto:**
```bash
cd tagview-desafio-fullstack
```

**3. Construa as Imagens e Suba os Contêineres:**
```bash
docker-compose up --build -d
```

Este comando irá:
- Construir as imagens Docker para API, Cliente e Banco de Dados
- Iniciar os contêineres em background (`-d`)
- Criar o banco de dados PostgreSQL
- Aguardar a inicialização completa de todos os serviços

**4. Aguarde a Inicialização**
A primeira execução pode levar alguns minutos para:
- Baixar as imagens base
- Instalar dependências
- Inicializar o banco de dados

**5. Acesse a Aplicação:**

Após a conclusão, os serviços estarão disponíveis:

-   🌐 **Frontend:** `http://localhost:3000`
-   ⚙️ **API:** `http://localhost:4000`
-   📖 **Swagger UI:** `http://localhost:4000/swagger-ui.html`

**6. Para Parar os Contêineres:**
```bash
docker-compose down
```

**7. Para Parar e Remover Volumes (limpa banco de dados):**
```bash
docker-compose down -v
```

---

## 🔌 Uso da API

### Informações de Acesso

-   **URL Base:** `http://localhost:4000/api/v1`
-   **Autenticação:** Todas as requisições devem conter o header:
    ```http
    X-API-KEY: tagview-desafio-2024
    ```

### Exemplos de Requisições

#### Listar Produtos
```bash
curl -X GET "http://localhost:4000/api/v1/produtos" \
  -H "X-API-KEY: tagview-desafio-2024"
```

#### Criar Produto
```bash
curl -X POST "http://localhost:4000/api/v1/produtos" \
  -H "X-API-KEY: tagview-desafio-2024" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Teclado Mecânico",
    "preco": 350.00,
    "descricao": "Teclado mecânico RGB com switches Cherry MX Blue para maior precisão e conforto durante longas sessões",
    "imagem": null
  }'
```

### Testando com Swagger

1. Acesse `http://localhost:4000/swagger-ui.html`
2. Clique no botão **"Authorize"** (cadeado verde)
3. Digite `tagview-desafio-2024` no campo Value
4. Clique em **"Authorize"** e depois **"Close"**
5. Teste os endpoints diretamente pela interface

---

## 🧪 Testes

### Como Testar a Aplicação

1. **Teste de Listagem:**
   - Acesse `http://localhost:3000/produtos/exibir`
   - Verifique carregamento dos produtos
   - Teste a paginação
   - Clique em um card para abrir o modal

2. **Teste de Cadastro:**
   - Acesse `http://localhost:3000/produtos/cadastro`
   - Tente enviar formulário vazio (validação frontend)
   - Preencha os campos corretamente
   - Teste upload de imagem > 5MB (erro frontend)
   - Teste upload de imagem entre 2-5MB (erro backend)
   - Cadastre um produto válido
   - Verifique redirecionamento e abertura do modal

3. **Teste de Query Param:**
   - Após cadastrar um produto, copie o UUID da URL
   - Acesse `http://localhost:3000/produtos/exibir?idProduto=[UUID que devera ser passado]`
   - Verifique se o modal abre automaticamente

4. **Teste da API via Swagger:**
   - Acesse `http://localhost:4000/swagger-ui.html`
   - Autentique com `tagview-desafio-2024`
   - Teste todos os endpoints


## 👨‍💻 Autor

**Aldo Junio Souza Brandão**

- 📧 Email: [aldojunio.dev@gmail.com]
- 💼 LinkedIn: [https://linkedin.com/in/seu-perfil](https://linkedin.com/in/seu-perfil)
- 🐙 GitHub: [https://github.com/AldoJDev](https://github.com/AldoJDev)

---

## 📄 Licença

Este projeto foi desenvolvido como parte de um desafio técnico para a Tagview.

---

## 🙏 Agradecimentos

Agradeço à equipe da **Tagview** pela oportunidade de participar deste desafio técnico. Foi uma experiência que me permitiu demonstrar habilidades em desenvolvimento full-stack, trabalho com APIs RESTful, containerização e boas práticas de desenvolvimento de software.

---