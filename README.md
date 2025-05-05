# Customer Sync Frontend

Este projeto é uma aplicação frontend desenvolvida com Vue 3 e Vite, projetada para gerenciar clientes de forma eficiente. Ele inclui funcionalidades como cadastro de clientes, validação de dados, navegação entre páginas e integração com APIs.

## Tecnologias Utilizadas

- **Vue 3**: Framework JavaScript progressivo para construção de interfaces de usuário.
- **Vite**: Ferramenta de build rápida e moderna.
- **Pinia**: Gerenciamento de estado para Vue.
- **Vue Router**: Gerenciamento de rotas.
- **Yup**: Validação de esquemas de dados.
- **Axios**: Cliente HTTP para comunicação com APIs.
- **Vitest**: Testes unitários.
- **Playwright**: Testes de ponta a ponta.

## Estrutura do Projeto

```plaintext
src/
├── assets/         # Arquivos estáticos (CSS, imagens, etc.)
├── components/     # Componentes Vue reutilizáveis
├── composables/    # Funções reutilizáveis (composables)
├── data/           # Dados mockados ou estáticos
├── router/         # Configuração de rotas
├── services/       # Serviços para comunicação com APIs
├── stores/         # Gerenciamento de estado com Pinia
├── validation/     # Esquemas de validação com Yup
├── views/          # Páginas principais da aplicação
```

## Configuração do Ambiente

### Pré-requisitos

- Node.js (versão 16 ou superior)
- Gerenciador de pacotes npm ou yarn

### Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/customer-sync-frontend.git
   cd customer-sync-frontend
   ```

2. Instale as dependências:
   ```sh
   npm install
   ```

### Scripts Disponíveis

- **Iniciar o servidor de desenvolvimento**:
  ```sh
  npm run dev
  ```

- **Build para produção**:
  ```sh
  npm run build
  ```

## Funcionalidades Principais

- **Dashboard**: Exibe estatísticas gerais sobre os clientes.
- **Cadastro de Clientes**: Wizard para adicionar novos clientes com validação de dados.
- **Lista de Clientes**: Exibição paginada e filtrada de clientes.
- **Validação de Dados**: Utiliza Yup para garantir a integridade dos dados.
- **Gerenciamento de Estado**: Implementado com Pinia para controle centralizado.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).