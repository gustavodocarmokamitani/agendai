# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
=======
## Como Rodar o Projeto

### Frontend

Clone o repositório do front-end:
```bash
git clone https://github.com/gustavodocarmokamitani/agendai.git

```
Entre na pasta do repositório:
```bash
cd <diretório do repositório>
```

Instale as dependências:
```bash
npm install
```

Inicie o servidor de desenvolvimento:
```bash
npm run start
```
### 
O front-end estará disponível em http://localhost:3000

---

# Projeto de Agendamento de Serviço
## Visão Geral

Este projeto permite a administração de serviços, funcionários e agendamentos de maneira eficiente. Ele inclui recursos para gerenciar horários, serviços disponíveis e status dos agendamentos. A aplicação também possui autenticação baseada em JWT e funcionalidades específicas para administradores, funcionários e clientes.

---

## Funcionalidades

### Autenticação e Registro

- **Autenticação JWT**: Login e registro seguros utilizando JSON Web Token.
    - **Registro de Usuário**: Funcionalidade para clientes, funcionarios e administradores se registrarem na plataforma.
- **Login**: Login para diferentes níveis de usuário: Admin, Funcionário e Cliente.
- **Futuro Planejado**: Login e registro utilizando Google OAuth.

### Administração

- **Gerenciamento de Serviços**:
    - Criar, editar e excluir serviços.
    - Definir nome, preço, duração, disponibilidade e descrição de cada serviço.
- **Gerenciamento de Funcionários**:
    - Criar, editar e excluir funcionários.
    - Gerenciar perfis de funcionários.
    - Atribuir serviços que cada funcionário pode realizar.
- **Configurações da Loja**:
    - Definir se loja está aberta ou fechada.
    - Definir horários de funcionamento.
    - Configurar dias de trabalho na semana.
    - Marcar feriados e dias de folga anuais.

### Agendamento

- **Cliente**:
    - Selecionar funcionário e serviço desejado.
    - Agendar data e hora.
- **Funcionário e Admin**:
    - Visualizar e gerenciar agendamentos.
    - Alterar status dos agendamentos (Ex.: Confirmado, Em andamento, Finalizado, Cancelado).

### Status dos Agendamentos

- Os status disponíveis incluem:
    - **Pendente**: Aguardando aprovação.
    - **Confirmado**: Serviço confirmado pelo admin ou funcionário.
    - **Em andamento**: Serviço em execução.
    - **Finalizado**: Serviço concluído.
    - **Cancelado**: Agendamento cancelado.

---

## Sugestões de Melhorias

### Funcionalidades Técnicas

1. **Integração com Google OAuth**: Implementar login via Google para facilitar o acesso dos usuários.
2. **Notificações**:
    - Envio de notificações por e-mail ou SMS para lembrar os clientes sobre agendamentos.
    - Notificação de status para clientes e funcionários.
3. **Dashboard Analítico**:
    - Visualizar métricas como serviços mais solicitados, horários mais populares e desempenho dos funcionários.
4. **Calendário Integrado**:
    - Visualizar todos os agendamentos em formato de calendário.
5. **Lista de Espera**:
    - Permitir que clientes entrem em uma lista de espera caso todos os horários estejam preenchidos.

### Funcionalidades para Usuários

1. **Perfis de Funcionários**:
    - Mostrar perfis de funcionários para que clientes possam escolher com base em avaliações e habilidades.
2. **Avaliação de Serviços**:
    - Permitir que os clientes avaliem os serviços e funcionários após a conclusão.
3. **Histórico de Agendamentos**:
    - Exibir histórico de agendamentos para clientes e funcionários.

### Melhoria na Gestão de Loja

1. **Configuração Avançada de Horários**:
    - Permitir horários flexíveis por funcionário.
    - Configurar horários de trabalho diferenciados por dia da semana.
2. **Gerenciamento de Promoções**:
    - Criar promoções e descontos sazonais para atrair mais clientes.

### Melhoria na Interface

1. **Responsividade e Design**:
    - Garantir que a interface funcione perfeitamente em outros dispositivos.
2. **Acessibilidade**:
    - Garantir que a aplicação seja acessível a pessoas com deficiência, utilizando práticas como WCAG.

---

### Tecnologias Utilizadas

### **Back-end**:

- **ASP.NET**: Framework para desenvolvimento do back-end.
- **JWT**: Para autenticação.
- **Mailersend**: Para envio de e-mails, como notificações e confirmações de agendamentos.

### **Front-end**:

- **React**: Biblioteca JavaScript para construir interfaces de usuário.
- **TypeScript**: Superset do JavaScript para garantir tipagem estática.
- **Styled-components**: Para estilização da interface utilizando CSS-in-JS.
- **Axios**: Para comunicação com a API.
- **React Router**: Para navegação entre as páginas.
- **Material-UI**: Para componentes de interface prontos e responsivos.
- **React Bootstrap**: Para componentes básicos e estilos.
- **Moment.js**: Para manipulação e formatação de datas.
- **React-datepicker**: Para escolha de datas no front-end.
- **React Icons**: Para ícones no front-end.
- **Notistack**: Para exibição de notificações rápidas.
