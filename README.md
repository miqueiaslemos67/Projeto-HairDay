# Projeto Hair Day

Aplicacao web de agendamento para salao de beleza desenvolvida em aula com HTML, CSS e JavaScript modular.

O projeto foi mantido com foco didatico, por isso o codigo contem comentarios explicativos e ha arquivos `.md` com observacoes sobre a estrutura, as correcoes aplicadas e as regras de negocio estudadas durante o desenvolvimento.

## Funcionalidades

- visualizar agendamentos do dia separados por periodo;
- criar novos agendamentos a partir da data escolhida;
- bloquear horarios passados e horarios ja ocupados;
- listar proximos agendamentos em bloco separado;
- cancelar agendamentos pela interface.

## Tecnologias

- HTML
- CSS
- JavaScript modular
- Webpack
- Babel
- Day.js
- JSON Server

## Como executar

### 1. Instale as dependencias

```bash
npm install
```

### 2. Inicie a API fake

```bash
npm run server
```

### 3. Em outro terminal, rode o projeto

```bash
npm run dev
```

Aplicacao: `http://localhost:3000`

API fake: `http://localhost:3333/schedules`

## Scripts

- `npm run dev`: sobe o servidor de desenvolvimento com Webpack
- `npm run build`: gera o bundle em `dist/`
- `npm run server`: inicia o `json-server` usando `server.json`

## Estrutura principal

```text
.
|- index.html
|- server.json
|- src/
|  |- assets/
|  |- libs/
|  |- modules/
|  |- services/
|  |- styles/
|  `- utils/
`- docs/
```

## Documentacao

- `docs/README.md`: indice dos materiais de apoio
- `docs/documentacao-projeto.md`: visao geral da arquitetura e das pastas
- `docs/proximos-agendamentos.md`: explicacao da separacao entre agenda do dia e proximos atendimentos
- `docs/form/ajustes-agendamento.md`: ajustes realizados no fluxo de agendamento
- `docs/form/correcao-agendamento.md`: validacao para evitar duplicidade no mesmo horario

## Observacoes

- este repositorio foi desenvolvido em aula;
- os comentarios no codigo foram preservados com objetivo de estudo e consulta;
- os arquivos `.md` servem como apoio para entendimento da implementacao e das correcoes feitas ao longo do projeto.
