# Projeto Hair Day

Aplicação web de agendamento para salão de beleza, desenvolvida em aula com HTML, CSS e JavaScript modular.

O projeto foi mantido com foco didático. Por isso, o código contém comentários explicativos e arquivos `.md` com observações sobre a estrutura, as correções aplicadas e as regras de negócio estudadas durante o desenvolvimento.

## Funcionalidades

- Visualizar os agendamentos do dia, separados por período;
- Criar novos agendamentos a partir da data escolhida;
- Bloquear horários passados e horários já ocupados;
- Listar os próximos agendamentos em uma seção separada;
- Cancelar agendamentos pela interface.

## Tecnologias

- HTML
- CSS
- JavaScript (ES Modules)
- Webpack
- Babel
- Day.js
- JSON Server

## Como executar

### 1. Instale as dependências

```bash
npm install
```

### 2. Inicie a API fake

```bash
npm run server
```

### 3. Em outro terminal, execute o projeto

```bash
npm run dev
```

Aplicação: `http://localhost:3000`

API fake: `http://localhost:3333/schedules`

## Scripts

- `npm run dev`: inicia o servidor de desenvolvimento com Webpack.
- `npm run build`: gera o bundle na pasta `dist/`.
- `npm run server`: inicia o `json-server` utilizando o arquivo `server.json`.

## Estrutura principal

```text
.
├── index.html
├── server.json
├── src/
│   ├── assets/
│   ├── libs/
│   ├── modules/
│   ├── services/
│   ├── styles/
│   └── utils/
└── docs/
```

## Documentação

- `docs/README.md`: índice dos materiais de apoio.
- `docs/documentacao-projeto.md`: visão geral da arquitetura e da organização das pastas.
- `docs/proximos-agendamentos.md`: explicação sobre a separação entre a agenda do dia e os próximos atendimentos.
- `docs/form/ajustes-agendamento.md`: ajustes realizados no fluxo de agendamento.
- `docs/form/correcao-agendamento.md`: validação para evitar agendamentos duplicados no mesmo horário.

## Observações

- Este repositório foi desenvolvido durante as aulas.
- Os comentários no código foram preservados com o objetivo de estudo e consulta.
- Os arquivos `.md` servem como material de apoio para facilitar o entendimento da implementação e das correções realizadas ao longo do projeto.
