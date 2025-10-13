# TagProducts - Desafio FullStack Tagview

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)![Spring](https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white)![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

Este repositório contém a solução completa para o desafio técnico da **Tagview** para a posição de Desenvolvedor FullStack.

O projeto consiste em uma aplicação web para gerenciamento de produtos, composta por uma API RESTful construída com **Java/Spring Boot** e um frontend interativo desenvolvido com **React**. Todo o ambiente é orquestrado com **Docker**, visando a simplicidade na execução e a consistência entre os ambientes.

---

## 🚀 Links para Acesso (Deploy)

A aplicação foi implantada e está publicamente acessível nos seguintes links:

*   **Frontend (Aplicação Web):** ** **
*   **API (Documentação Swagger):** ** **

---

## ✨ Features Implementadas

### Frontend
- **Listagem de Produtos:** Exibição dos produtos em formato de cards.
- **Paginação:** Sistema de paginação completo para a lista de produtos.
- **Seleção de Limite:** Permite alterar a quantidade de produtos exibidos por página (10, 20, 50 ou Todos).
- **Modal de Detalhes:** Ao clicar em um card, um modal exibe os detalhes completos do produto.
- **Abertura de Modal via URL:** Acessar a página com o query param `?idProduto=` abre o modal do produto especificado.
- **Formulário de Cadastro:** Página dedicada para o cadastro de novos produtos.
- **Validação de Formulário:** Validação completa no frontend antes do envio dos dados.
- **Feedback de API:** Exibição de mensagens de erro retornadas pelo backend.
- **Redirecionamento Pós-Sucesso:** Após o cadastro, o usuário é redirecionado para a página de listagem com o modal do novo produto aberto e uma mensagem de sucesso.

### Backend
- **API RESTful:** Endpoints para listar e criar produtos.
- **Validações:** Validações robustas no lado do servidor para todos os campos.
- **Segurança:** Acesso aos endpoints protegido por um cabeçalho `X-API-KEY`.
- **Delay Simulado:** Inclusão de um delay artificial de 3 segundos em todas as respostas para simular latência de rede.
- **Documentação Automatizada:** Documentação da API gerada automaticamente com SpringDoc (Swagger).
- **Tratamento de Erros:** Respostas de erro padronizadas para diferentes cenários (401, 422, 500).

---

## 🛠️ Stack de Tecnologias

- **Backend:**
  - Java 21
  - Spring Boot 
  - Spring Data JPA
  - Spring Validation
  - SpringDoc OpenAPI (Swagger)
  - Maven
- **Frontend:**
  - React
  - TypeScript (ou JavaScript)
  - Axios (para requisições HTTP)
- **Banco de Dados & Infraestrutura:**
  - PostgreSQL 
  - Docker & Docker Compose

---

## ⚙️ Como Executar o Projeto Localmente

Para executar este projeto em sua máquina, você precisará ter o **Git** e o **Docker** instalados.

**1. Clone o Repositório:**
```bash
git clone https://github.com/AldoJDev/tagview-desafio-fullstack.git
```

**2. Navegue até a Pasta do Projeto:**
```bash
cd tagview-desafio-fullstack
```

**3. Construa as Imagens e Suba os Contêineres:**
Este comando irá construir as imagens Docker para a API e o cliente, iniciar os contêineres em background (`-d`) e garantir que tudo seja reconstruído caso haja mudanças (`--build`).
```bash
docker-compose up --build -d
```

**4. Pronto!**
Após a conclusão do comando, os serviços estarão disponíveis nos seguintes endereços:

-   🌐 **Frontend:** `[ARRUMAR]`
-   ⚙️ **Backend (API):** `[ARRUMAR]`
-   📖 **Documentação da API (Swagger):** `[ARRUMAR]`

---

## 🔌 Uso da API

Para interagir diretamente com a API (via Postman, Insomnia, etc.), utilize as informações abaixo:

-   **URL Base:** `[ARRUMAR]`
-   **Autenticação:** Todas as requisições para a API devem conter o seguinte cabeçalho:
    ```http
    X-API-KEY: tagview-desafio-2024
    ```

---

## 📁 Estrutura do Projeto

O projeto está organizado em um monorepo com a seguinte estrutura:

```
/
├── api/             # Contém o código-fonte da API em Spring Boot
├── client/          # Contém o código-fonte do frontend em React
├── docker-compose.yml # Orquestra a execução dos serviços
└── README.md        # Este arquivo
```

---

Obrigado pela oportunidade!

**Aldo Junio Souza Brandão**
- **LinkedIn:** `https://linkedin.com/in/seu-perfil`
- **GitHub:** `https://github.com/seu-usuario`