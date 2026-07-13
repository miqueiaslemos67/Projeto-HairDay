# Documentacao do Projeto

## Visao geral

`Hair Day` e uma aplicacao web para agendamento de horarios em um salao.

O projeto usa:

- HTML para a estrutura da tela;
- CSS para os estilos;
- JavaScript modular para comportamento;
- `dayjs` para datas;
- `json-server` como API fake local;
- `webpack` para empacotamento.

O foco da arquitetura e simples:

- `services` lidam com dados;
- `modules` lidam com interacao e renderizacao;
- `styles` lidam com aparencia;
- `utils` e `libs` oferecem apoio;
- `index.html` define a base visual da aplicacao.

---

## Estrutura de pastas

### raiz do projeto

Responsavel pelos arquivos de configuracao, entrada HTML, base de dados fake e documentacoes auxiliares.

Use essa camada quando for:

- configurar build;
- instalar dependencias;
- subir o servidor local;
- abrir documentacoes gerais do projeto.

Ela se relaciona com `src/`, `dist/` e `server.json`.

### `src`

Pasta principal do codigo-fonte.

Use quando for alterar comportamento, layout, comunicacao com API ou regras de negocio.

Ela se relaciona com todas as subpastas abaixo e e o ponto de entrada do `webpack` por meio de `src/main.js`.

### `src/assets`

Guarda arquivos visuais estaticos, como icones e logotipo.

Use quando a interface precisar de imagens, simbolos ou favicon.

Ela e consumida por `index.html`, pelos modulos que criam elementos dinamicos e pelos arquivos CSS.

### `src/libs`

Centraliza configuracoes de bibliotecas externas.

Use quando uma dependencia precisar ser configurada uma unica vez antes do restante da aplicacao.

Ela se relaciona diretamente com `src/main.js` e indiretamente com todos os modulos que usam `dayjs`.

### `src/modules`

Organiza a logica da aplicacao por responsabilidade de tela e comportamento.

Use quando o codigo representar um fluxo da interface, como carregar horarios, reagir ao submit ou renderizar a agenda.

Ela se relaciona fortemente com `services`, `styles`, `utils` e `index.html`.

### `src/modules/form`

Concentra tudo que pertence ao formulario de criacao de agendamento.

Use quando o comportamento estiver ligado a:

- data selecionada;
- horarios disponiveis;
- clique no horario;
- envio do formulario.

Ela se conecta com `services` para validacao e gravacao, e com `modules/schedules` para recarregar a interface.

### `src/modules/schedules`

Concentra tudo que pertence a exibicao e atualizacao das agendas.

Use quando a regra envolver:

- agenda do dia;
- proximos agendamentos;
- exclusao;
- carga inicial dos dados.

Ela se conecta com `services` para buscar/remover dados, com `form` para manter a tela sincronizada e com `index.html` para preencher os containers da agenda.

### `src/services`

Responsavel pela comunicacao com a API fake.

Use quando for buscar, criar ou excluir agendamentos.

Ela e chamada pelos modulos da interface e reaproveita `api-config.js` para manter a URL centralizada.

### `src/styles`

Responsavel pela camada visual.

Use quando a alteracao for apenas de aparencia, espacamento, responsividade, tipografia ou estados visuais.

Ela se relaciona com `index.html` e com os elementos gerados dinamicamente pelos modulos JavaScript.

### `src/utils`

Guarda dados e funcoes auxiliares simples e reutilizaveis.

Use quando um valor ou regra puder ser reaproveitado em mais de um ponto sem depender de DOM ou API.

Hoje se relaciona principalmente com `modules/form/hours-load.js`.

### `dist`

Pasta gerada pelo build.

Use apenas para validar o resultado final empacotado.

Nao e o lugar ideal para editar manualmente, porque seu conteudo pode ser refeito pelo `webpack` a qualquer momento.

### `node_modules`

Pasta de dependencias instaladas pelo npm.

Use apenas para consumo automatico pelo projeto.

Nao faz parte da logica autoral do sistema e normalmente nao deve ser alterada manualmente.

---

## Arquivos do projeto

Observacao: a documentacao abaixo cobre os arquivos autorais e os arquivos gerados/relevantes para estudo da arquitetura. Nao detalha arquivo por arquivo dentro de `node_modules`, pois essa pasta pertence as dependencias externas.

### Arquivos da raiz

#### `package.json`

- Finalidade: define metadados do projeto, scripts e dependencias.
- Responsabilidade: dizer como rodar o ambiente, o servidor fake e o build.
- Quando e utilizado: sempre que `npm install`, `npm run dev`, `npm run build` ou `npm run server` sao executados.
- Quem utiliza: npm, webpack e o desenvolvedor.

#### `package-lock.json`

- Finalidade: travar as versoes exatas das dependencias instaladas.
- Responsabilidade: garantir reproducibilidade do ambiente.
- Quando e utilizado: durante instalacao com npm.
- Quem utiliza: npm.

#### `index.html`

- Finalidade: servir como template principal da interface.
- Responsabilidade: montar a estrutura base do formulario, agenda do dia e proximos agendamentos.
- Quando e utilizado: no carregamento inicial da aplicacao e no build do webpack.
- Quem utiliza: `webpack.config.js`, `src/main.js` e todos os modulos que manipulam elementos do DOM.

#### `webpack.config.js`

- Finalidade: configurar empacotamento, servidor local e copia de assets.
- Responsabilidade: transformar `src/main.js` em `dist/main.js`, processar CSS e gerar `dist/index.html`.
- Quando e utilizado: nos scripts `dev` e `build`.
- Quem utiliza: webpack.

#### `server.json`

- Finalidade: base de dados fake da API local.
- Responsabilidade: armazenar a colecao `schedules`.
- Quando e utilizado: quando `json-server` e iniciado pelo script `server`.
- Quem utiliza: os arquivos em `src/services`.

#### `EXPLICACAO_PROXIMOS_AGENDAMENTOS.md`

- Finalidade: documentar a funcionalidade de agenda do dia e proximos agendamentos.
- Responsabilidade: registrar a regra, os arquivos alterados e a logica de filtro/agrupamento.
- Quando e utilizado: estudo e revisao da feature.
- Quem utiliza: desenvolvedor/estudante.

#### `DOCUMENTACAO_PROJETO.md`

- Finalidade: material de estudo geral do projeto.
- Responsabilidade: explicar arquitetura, fluxo, arquivos, funcoes e regras.
- Quando e utilizado: revisao futura do projeto.
- Quem utiliza: desenvolvedor/estudante.

### Arquivos de `src`

#### `src/main.js`

- Finalidade: ponto de entrada da aplicacao.
- Responsabilidade: carregar configuracao global, estilos e modulos.
- Quando e utilizado: sempre que a aplicacao inicia.
- Quem utiliza: `webpack` como `entry` principal.

#### `src/libs/dayjs.js`

- Finalidade: configurar o `dayjs` para o locale `pt-br`.
- Responsabilidade: garantir padrao de idioma nas operacoes com data.
- Quando e utilizado: logo no inicio da aplicacao, antes dos outros modulos.
- Quem utiliza: `src/main.js` e, indiretamente, todos os modulos que usam `dayjs`.

### Arquivos de `src/utils`

#### `src/utils/opening-hours.js`

- Finalidade: listar os horarios padrao do salao.
- Responsabilidade: servir de base para a montagem da grade de horarios.
- Quando e utilizado: ao renderizar horarios disponiveis no formulario.
- Quem utiliza: `src/modules/form/hours-load.js`.

### Arquivos de `src/services`

#### `src/services/api-config.js`

- Finalidade: centralizar a URL base da API.
- Responsabilidade: evitar repeticao do endereco `http://localhost:3333`.
- Quando e utilizado: em qualquer chamada HTTP da aplicacao.
- Quem utiliza: `schedule-new.js`, `schedule-cancel.js` e `schedule-fetch-by-day.js`.

#### `src/services/schedule-new.js`

- Finalidade: criar um novo agendamento.
- Responsabilidade: enviar `POST /schedules` com `id`, `name` e `when`.
- Quando e utilizado: no envio do formulario.
- Quem utiliza: `src/modules/form/submit.js`.

#### `src/services/schedule-cancel.js`

- Finalidade: cancelar um agendamento existente.
- Responsabilidade: localizar o registro e enviar `DELETE /schedules/:id`.
- Quando e utilizado: ao clicar no icone de exclusao.
- Quem utiliza: `src/modules/schedules/cancel.js`.

#### `src/services/schedule-fetch-by-day.js`

- Finalidade: buscar agendamentos e filtrar por dia quando necessario.
- Responsabilidade: carregar a colecao da API e devolver:
  - apenas os agendamentos de um dia; ou
  - os agendamentos do dia junto da lista completa.
- Quando e utilizado: ao carregar agenda, validar duplicidade e atualizar horarios.
- Quem utiliza: `src/modules/schedules/load.js` e `src/modules/form/submit.js`.

### Arquivos de `src/modules/form`

#### `src/modules/form/submit.js`

- Finalidade: controlar o envio do formulario.
- Responsabilidade: validar campos, validar horario selecionado, checar conflito, montar data/hora final, salvar e atualizar a tela.
- Quando e utilizado: ao clicar em `Agendar`.
- Quem utiliza: o proprio `form` do `index.html`.

#### `src/modules/form/date-change.js`

- Finalidade: reagir a troca da data no input.
- Responsabilidade: recarregar a interface quando o usuario troca a data do formulario.
- Quando e utilizado: no evento `change` do input `#date`.
- Quem utiliza: `src/main.js` ao importar o modulo.

#### `src/modules/form/hours-load.js`

- Finalidade: montar a lista visual de horarios disponiveis.
- Responsabilidade: marcar horarios livres, ocupados e passados.
- Quando e utilizado: no carregamento da tela e sempre que a data ou os agendamentos mudam.
- Quem utiliza: `src/modules/schedules/load.js`.

#### `src/modules/form/hours-click.js`

- Finalidade: controlar a selecao visual de um horario.
- Responsabilidade: permitir que apenas um horario fique marcado por vez.
- Quando e utilizado: depois que a lista de horarios e renderizada.
- Quem utiliza: `src/modules/form/hours-load.js`.

#### `src/modules/form/EXPLICACAO_CORRECAO_AGENDAMENTO.md`

- Finalidade: documentar a correcao da duplicidade de horario no mesmo dia.
- Responsabilidade: explicar a regra, o motivo e os arquivos alterados.
- Quando e utilizado: estudo da correcao do fluxo de agendamento.
- Quem utiliza: desenvolvedor/estudante.

#### `src/modules/form/ajustes-agendamento.md`

- Finalidade: explicar ajustes anteriores no fluxo do formulario.
- Responsabilidade: registrar erros corrigidos em data, horario e submit.
- Quando e utilizado: apoio de estudo.
- Quem utiliza: desenvolvedor/estudante.

### Arquivos de `src/modules/schedules`

#### `src/modules/page-load.js`

- Finalidade: disparar a primeira carga da agenda.
- Responsabilidade: chamar `schedulesDay()` quando o DOM estiver pronto.
- Quando e utilizado: na abertura da aplicacao.
- Quem utiliza: `src/main.js`.

#### `src/modules/schedules/load.js`

- Finalidade: ser o orquestrador central da agenda.
- Responsabilidade: buscar dados, separar agenda do dia, separar horarios da data selecionada e atualizar os dois containers da direita.
- Quando e utilizado: no carregamento inicial, ao trocar data, ao criar e ao excluir agendamento.
- Quem utiliza: `page-load.js`, `submit.js`, `date-change.js` e `cancel.js`.

#### `src/modules/schedules/show.js`

- Finalidade: renderizar `Agendamentos do Dia`.
- Responsabilidade: distribuir os atendimentos nos periodos manha, tarde e noite.
- Quando e utilizado: sempre que `load.js` recalcula a agenda do dia.
- Quem utiliza: `src/modules/schedules/load.js`.

#### `src/modules/schedules/upcoming-show.js`

- Finalidade: renderizar `Proximos Agendamentos`.
- Responsabilidade: filtrar datas futuras, ordenar, agrupar por dia e montar a lista dinamica.
- Quando e utilizado: sempre que `load.js` recalcula a agenda geral.
- Quem utiliza: `src/modules/schedules/load.js`.

#### `src/modules/schedules/cancel.js`

- Finalidade: controlar o cancelamento de agendamentos.
- Responsabilidade: ouvir cliques nos icones de exclusao, pedir confirmacao, remover na API e recarregar a tela.
- Quando e utilizado: ao clicar no `X` da agenda do dia ou dos proximos agendamentos.
- Quem utiliza: `src/main.js` ao importar o modulo.

### Arquivos de `src/styles`

#### `src/styles/global.css`

- Finalidade: definir tokens visuais e layout global.
- Responsabilidade: cores, tipografia, grid principal, resets e responsividade geral.
- Quando e utilizado: desde a inicializacao da aplicacao.
- Quem utiliza: `src/main.js`.

#### `src/styles/form.css`

- Finalidade: estilizar o formulario lateral e a grade de horarios.
- Responsabilidade: aparencia dos inputs, botao, horarios e estados visuais do formulario.
- Quando e utilizado: junto da renderizacao do formulario.
- Quem utiliza: `src/main.js`.

#### `src/styles/schedule.css`

- Finalidade: estilizar a agenda do dia e os proximos agendamentos.
- Responsabilidade: cards, periodos, lista de itens, cabecalhos, vazio e responsividade da area da direita.
- Quando e utilizado: junto da renderizacao das agendas.
- Quem utiliza: `src/main.js`.

### Arquivos de `src/assets`

#### `src/assets/logo.svg`

- Finalidade: logotipo principal da aplicacao.
- Responsabilidade: identidade visual do topo lateral.
- Quem utiliza: `index.html`.

#### `src/assets/scissors.svg`

- Finalidade: icone tematico do projeto.
- Responsabilidade: favicon e referencia visual da marca.
- Quem utiliza: `index.html` e `webpack.config.js`.

#### `src/assets/person.svg`

- Finalidade: icone do campo cliente.
- Responsabilidade: reforcar visualmente o input de nome.
- Quem utiliza: `index.html`.

#### `src/assets/calendar.svg`

- Finalidade: icone de calendario.
- Responsabilidade: representar data no formulario e nos blocos de agenda.
- Quem utiliza: `index.html` e `src/modules/schedules/upcoming-show.js`.

#### `src/assets/arrow-down.svg`

- Finalidade: seta visual de selecao/indicacao.
- Responsabilidade: compor o input de data e o selo de data da agenda.
- Quem utiliza: `index.html` e `src/styles/form.css`.

#### `src/assets/cancel.svg`

- Finalidade: icone de exclusao.
- Responsabilidade: indicar acao de cancelar agendamento.
- Quem utiliza: `src/modules/schedules/show.js` e `src/modules/schedules/upcoming-show.js`.

#### `src/assets/morning.svg`

- Finalidade: icone do periodo da manha.
- Responsabilidade: compor o bloco da agenda do dia.
- Quem utiliza: `index.html`.

#### `src/assets/afternoon.svg`

- Finalidade: icone do periodo da tarde.
- Responsabilidade: compor o bloco da agenda do dia.
- Quem utiliza: `index.html`.

#### `src/assets/night.svg`

- Finalidade: icone do periodo da noite.
- Responsabilidade: compor o bloco da agenda do dia.
- Quem utiliza: `index.html`.

### Arquivos gerados em `dist`

#### `dist/index.html`

- Finalidade: HTML final gerado pelo build.
- Responsabilidade: versao pronta para execucao empacotada.
- Quando e utilizado: ao abrir o projeto empacotado.
- Quem utiliza: webpack e navegador.

#### `dist/main.js`

- Finalidade: bundle final da aplicacao.
- Responsabilidade: reunir todos os modulos JavaScript e CSS processados.
- Quando e utilizado: no ambiente empacotado.
- Quem utiliza: `dist/index.html`.

---

## Componentes da interface

Este projeto nao usa componentes de framework como React ou Vue. Aqui, os “componentes” sao blocos de interface montados com HTML e DOM nativo.

### Formulario de agendamento

- Responsabilidade: coletar data, horario e nome do cliente.
- Propriedades recebidas: nao recebe props; depende do DOM (`#date`, `#client`, `#hours`).
- Estados utilizados: valor do input de data, valor do input de nome e classe `.hour-selected`.
- Eventos principais:
  - `submit` do formulario;
  - `change` do input de data;
  - `click` nos horarios disponiveis.

### Agenda do Dia

- Responsabilidade: exibir somente os agendamentos cuja data e igual a hoje.
- Propriedades recebidas: `dailySchedules` em `schedulesShow({ dailySchedules })`.
- Estados utilizados: nao ha estado global; usa o array recebido e os containers `#period-morning`, `#period-afternoon` e `#period-night`.
- Eventos principais:
  - atualizacao disparada por `schedulesDay()`;
  - exclusao via clique no icone `cancel-icon`.

### Proximos Agendamentos

- Responsabilidade: exibir apenas os agendamentos com data maior que hoje.
- Propriedades recebidas: `schedules` em `upcomingSchedulesShow({ schedules })`.
- Estados utilizados: agrupamentos gerados em memoria a partir da lista completa.
- Eventos principais:
  - atualizacao disparada por `schedulesDay()`;
  - exclusao via clique no icone `cancel-icon`.

### Item de horario disponivel

- Responsabilidade: permitir ao usuario escolher um horario do formulario.
- Propriedades recebidas: hora e disponibilidade calculadas por `hoursLoad()`.
- Estados utilizados: classes `.hour-available`, `.hour-unavailable` e `.hour-selected`.
- Eventos principais: `click`.

### Item de agendamento

- Responsabilidade: mostrar horario, cliente e acao de exclusao.
- Propriedades recebidas: `schedule.id`, `schedule.name` e `schedule.when`.
- Estados utilizados: atributo `data-id` no `li`.
- Eventos principais: clique no icone de exclusao.

---

## Funcoes do projeto

### `scheduleNew({ id, name, when })`

- Finalidade: criar um agendamento.
- Parametros:
  - `id`: identificador unico;
  - `name`: nome do cliente;
  - `when`: data e hora do atendimento.
- Retorno: `Promise<void>`.
- Quando e executada: apos a validacao do formulario.
- Impacto: grava um novo registro na API e, depois, a tela e recarregada por `schedulesDay()`.

### `scheduleCancel({ id })`

- Finalidade: remover um agendamento.
- Parametros:
  - `id`: identificador do atendimento.
- Retorno: `Promise<void>`.
- Quando e executada: apos confirmacao do usuario no clique do icone de exclusao.
- Impacto: remove um registro na API e permite recarregar a agenda.

### `scheduleFetchByDay({ date, withAllSchedules = false })`

- Finalidade: buscar dados da agenda e filtrar por dia.
- Parametros:
  - `date`: data de referencia;
  - `withAllSchedules`: define se a resposta tambem deve incluir a colecao completa.
- Retorno:
  - `dailySchedules[]`; ou
  - `{ dailySchedules, allSchedules }`.
- Quando e executada: ao carregar telas e validar conflitos.
- Impacto: alimenta a agenda do dia, os proximos agendamentos e a grade de horarios.

### `schedulesDay()`

- Finalidade: coordenar a atualizacao principal da aplicacao.
- Parametros: nao recebe parametros formais no estado atual.
- Retorno: `Promise<void>`.
- Quando e executada:
  - na abertura da aplicacao;
  - na troca da data;
  - apos criar agendamento;
  - apos excluir agendamento.
- Impacto:
  - busca dados;
  - separa agendamentos de hoje;
  - separa agendamentos da data selecionada no formulario;
  - atualiza os dois containers da direita;
  - recalcula horarios disponiveis.

### `schedulesShow({ dailySchedules })`

- Finalidade: desenhar a agenda do dia.
- Parametros:
  - `dailySchedules`: lista de agendamentos de hoje.
- Retorno: nenhum.
- Quando e executada: dentro de `schedulesDay()`.
- Impacto: preenche as listas de manha, tarde e noite.

### `upcomingSchedulesShow({ schedules })`

- Finalidade: desenhar os proximos agendamentos.
- Parametros:
  - `schedules`: lista completa de agendamentos.
- Retorno: nenhum.
- Quando e executada: dentro de `schedulesDay()`.
- Impacto: filtra datas futuras, agrupa por dia e renderiza os blocos dinamicos.

### `getGroupLabel(date, referenceDate)`

- Finalidade: gerar o titulo de cada grupo de proximos agendamentos.
- Parametros:
  - `date`: data do grupo;
  - `referenceDate`: data atual usada como referencia.
- Retorno: string (`Hoje`, `Amanhã` ou `DD/MM/YYYY`).
- Quando e executada: durante a renderizacao dos grupos futuros.
- Impacto: melhora a leitura visual da agenda futura.

### `createScheduleItem(schedule)`

- Finalidade: criar o `li` de um agendamento dinamico no bloco de proximos.
- Parametros:
  - `schedule`: objeto do agendamento.
- Retorno: elemento `li` do DOM.
- Quando e executada: para cada item futuro renderizado.
- Impacto: padroniza a montagem visual do item.

### `hoursLoad({ date, dailySchedules = [] })`

- Finalidade: montar a grade de horarios do formulario.
- Parametros:
  - `date`: data selecionada no formulario;
  - `dailySchedules`: agendamentos existentes nessa data.
- Retorno: nenhum.
- Quando e executada: sempre que a data muda ou a tela e recarregada.
- Impacto: define quais horarios estao livres, ocupados ou passados.

### `hourHeaderAdd(title)`

- Finalidade: inserir o cabecalho de periodo na lista de horarios.
- Parametros:
  - `title`: nome do periodo (`Manhã`, `Tarde`, `Noite`).
- Retorno: nenhum.
- Quando e executada: durante a montagem da lista de horarios.
- Impacto: organiza visualmente a grade de horarios.

### `hoursClick()`

- Finalidade: controlar a selecao de horario.
- Parametros: nenhum.
- Retorno: nenhum.
- Quando e executada: apos `hoursLoad()` terminar de montar os horarios.
- Impacto: garante que apenas um horario disponivel fique selecionado.

### `form.onsubmit = async (event) => { ... }`

- Finalidade: encapsular o fluxo de criacao do agendamento.
- Parametros:
  - `event`: evento de submit.
- Retorno: nenhum valor explicito.
- Quando e executada: ao enviar o formulario.
- Impacto: valida, cria o agendamento, atualiza a interface e limpa o nome do cliente.

### `selectedDate.onchange = () => { ... }`

- Finalidade: reagir a troca de data no formulario.
- Parametros: nenhum.
- Retorno: nenhum.
- Quando e executada: ao alterar o input de data.
- Impacto: recarrega agenda e horarios da interface.

### `document.addEventListener("DOMContentLoaded", ...)`

- Finalidade: iniciar a carga da agenda apenas quando o DOM estiver pronto.
- Parametros: callback.
- Retorno: nenhum.
- Quando e executada: abertura da aplicacao.
- Impacto: dispara a primeira chamada de `schedulesDay()`.

### `schedule.addEventListener("click", async (event) => { ... })`

- Finalidade: lidar com exclusoes usando delegacao de evento.
- Parametros:
  - `event`: evento de clique.
- Retorno: nenhum.
- Quando e executada: ao clicar em algum icone de exclusao na area da agenda.
- Impacto: cancela o agendamento e atualiza os dois containers.

---

## Fluxo da aplicacao

1. Usuario abre a aplicacao.
2. `src/main.js` carrega a configuracao de datas, estilos e modulos.
3. `src/modules/page-load.js` chama `schedulesDay()` quando o DOM termina de carregar.
4. `schedulesDay()` busca os agendamentos na API.
5. O sistema separa:
   - agendamentos de hoje;
   - agendamentos da data selecionada no formulario;
   - agendamentos futuros.
6. `schedulesShow()` atualiza `Agendamentos do Dia`.
7. `upcomingSchedulesShow()` atualiza `Próximos Agendamentos`.
8. `hoursLoad()` recalcula os horarios disponiveis para a data escolhida no formulario.
9. Usuario seleciona uma data no input.
10. `date-change.js` dispara `schedulesDay()` novamente.
11. A agenda do dia continua mostrando apenas hoje.
12. A grade de horarios do formulario passa a refletir a nova data selecionada.
13. Usuario escolhe um horario.
14. `hoursClick()` marca visualmente o horario selecionado.
15. Usuario informa o nome do cliente.
16. Usuario clica em `Agendar`.
17. `submit.js` valida nome, data e horario selecionado.
18. O sistema consulta os agendamentos daquela data para evitar duplicidade.
19. Se houver conflito, exibe alerta e atualiza a interface.
20. Se nao houver conflito, chama `scheduleNew()`.
21. A API fake grava o novo registro.
22. `submit.js` chama `schedulesDay()` novamente.
23. A grade de horarios e recalculada.
24. `Agendamentos do Dia` e atualizado se a data criada for hoje.
25. `Próximos Agendamentos` e atualizado se a data criada for futura.
26. Se o usuario clicar em excluir, `cancel.js` chama `scheduleCancel()`.
27. A API remove o registro.
28. `cancel.js` chama `schedulesDay()` de novo.
29. Os horarios disponiveis e os dois containers da agenda ficam sincronizados.

---

## Agenda do Dia e Proximos Agendamentos

### Por que essa funcionalidade foi criada

Ela foi criada para separar melhor as informacoes da agenda.

Antes, a visualizacao dependia mais diretamente da data selecionada no formulario, o que podia causar confusao e duplicidade visual.

Agora a tela deixa claro:

- o que sera atendido hoje;
- o que esta agendado para os proximos dias.

### Qual problema ela resolveu

Resolveu dois problemas principais:

1. mistura entre a data do formulario e a agenda exibida;
2. duplicidade de um mesmo agendamento em mais de um container.

### Quais arquivos foram modificados nessa funcionalidade

- `index.html`
- `src/styles/schedule.css`
- `src/services/schedule-fetch-by-day.js`
- `src/modules/schedules/load.js`
- `src/modules/schedules/upcoming-show.js`
- `src/modules/schedules/cancel.js`
- `EXPLICACAO_PROXIMOS_AGENDAMENTOS.md`

### Como funciona a separacao entre os containers

#### Agendamentos do Dia

- usa apenas agendamentos com `data == hoje`;
- continua agrupando por manha, tarde e noite;
- nao depende mais da data escolhida no formulario.

#### Proximos Agendamentos

- usa apenas agendamentos com `data > hoje`;
- ordena por data e horario;
- agrupa por dia;
- nunca mostra itens do dia atual.

### Como ocorre o filtro por data

Em `load.js`, a lista completa e carregada uma unica vez.

Depois disso:

- `dailySchedules` recebe apenas os itens de hoje;
- `selectedDateSchedules` recebe os itens da data do formulario;
- `upcomingSchedulesShow()` recebe a lista completa, mas filtra apenas os dias futuros com `isAfter(currentDate, "day")`.

### Como ocorre a atualizacao automatica

A atualizacao parte sempre de `schedulesDay()`.

Essa funcao e chamada quando:

- a pagina abre;
- a data do formulario muda;
- um agendamento e criado;
- um agendamento e excluido.

Com isso, os dois containers e a grade de horarios ficam sempre consistentes.

---

## Explicacao do codigo da funcionalidade

### `index.html`

#### Bloco logico: container de proximos agendamentos

```html
<section class="upcoming-schedules" aria-labelledby="upcoming-title">
  <header class="upcoming-header">
    <div class="schedule-heading">
      <h1 id="upcoming-title">Próximos Agendamentos</h1>
      <p>Visualize todos os próximos atendimentos cadastrados</p>
    </div>
  </header>

  <div id="upcoming-groups" class="upcoming-groups"></div>
</section>
```

Explicacao:

- cria um novo container visual na area da agenda;
- `#upcoming-groups` funciona como ponto de montagem dinamica;
- o HTML nao traz os itens prontos, porque eles sao gerados pelo JavaScript.

#### Bloco logico: agenda do dia

```html
<h1 id="schedule-title">Agendamentos do Dia</h1>
<p>Visualize exclusivamente os atendimentos agendados para hoje</p>
```

Explicacao:

- deixa a regra da interface explicita;
- comunica ao usuario que o primeiro bloco nao depende mais da data do formulario.

### `src/services/schedule-fetch-by-day.js`

#### Importacoes

```js
import dayjs from "dayjs";
import { apiConfig } from "./api-config";
```

Explicacao:

- `dayjs` e usado para comparar datas por dia;
- `apiConfig` centraliza a URL da API.

#### Funcao principal

```js
export async function scheduleFetchByDay({ date, withAllSchedules = false }) {
```

Explicacao:

- recebe uma data de referencia;
- opcionalmente devolve a lista completa junto do filtro diario.

#### Busca na API

```js
const response = await fetch(`${apiConfig.baseUrl}/schedules`);
const schedules = await response.json();
```

Explicacao:

- sempre carrega a colecao completa da API fake;
- depois decide como reaproveitar esses dados localmente.

#### Filtro do dia

```js
const dailySchedules = schedules.filter((schedule) =>
  dayjs(date).isSame(schedule.when, "day"),
);
```

Explicacao:

- compara apenas o dia;
- ignora hora, minuto e segundo;
- e a base para validacao de conflitos e para o calculo dos horarios ocupados.

#### Retorno flexivel

```js
if (withAllSchedules) {
  return {
    dailySchedules,
    allSchedules: schedules,
  };
}
```

Explicacao:

- evita um segundo `fetch`;
- permite ao `load.js` atualizar mais de uma parte da tela com uma unica busca.

### `src/modules/schedules/load.js`

Esse e o arquivo mais importante da nova funcionalidade.

#### Importacoes

```js
import dayjs from "dayjs";
import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js";
import { schedulesShow } from "../schedules/show.js";
import { upcomingSchedulesShow } from "../schedules/upcoming-show.js";
import { hoursLoad } from "../form/hours-load.js";
```

Explicacao:

- `dayjs` calcula a data atual;
- `scheduleFetchByDay` busca os dados;
- `schedulesShow` atualiza a agenda do dia;
- `upcomingSchedulesShow` atualiza os proximos;
- `hoursLoad` atualiza a grade do formulario.

#### Constantes do DOM

```js
const selectedDate = document.getElementById("date");
const scheduleDateLabel = document.querySelector(".schedule-date span");
```

Explicacao:

- `selectedDate` representa a data escolhida pelo usuario no formulario;
- `scheduleDateLabel` representa a data exibida visualmente no bloco da direita.

#### Data atual e busca unica

```js
const date = selectedDate.value;
const today = dayjs().format("YYYY-MM-DD");

const { allSchedules } = await scheduleFetchByDay({
  date: today,
  withAllSchedules: true,
});
```

Explicacao:

- `date` continua sendo usada pelo formulario;
- `today` e a base da agenda do dia;
- a busca unica reduz repeticao e mantem a sincronizacao.

#### Separacao das listas

```js
const dailySchedules = allSchedules.filter((schedule) =>
  dayjs(today).isSame(schedule.when, "day"),
);

const selectedDateSchedules = allSchedules.filter((schedule) =>
  dayjs(date).isSame(schedule.when, "day"),
);
```

Explicacao:

- `dailySchedules` alimenta `Agendamentos do Dia`;
- `selectedDateSchedules` alimenta apenas os horarios do formulario.

#### Atualizacao visual

```js
scheduleDateLabel.textContent = dayjs(today).format("DD/MM/YYYY");
schedulesShow({ dailySchedules });
upcomingSchedulesShow({ schedules: allSchedules });
hoursLoad({ date, dailySchedules: selectedDateSchedules });
```

Explicacao:

- mostra a data de hoje no cabecalho;
- renderiza a agenda do dia;
- renderiza os proximos agendamentos;
- recalcula horarios disponiveis na data escolhida.

### `src/modules/schedules/upcoming-show.js`

#### Constante principal

```js
const upcomingGroups = document.getElementById("upcoming-groups");
```

Explicacao:

- aponta para o container vazio onde os grupos futuros serao inseridos.

#### Filtro de proximos

```js
const currentDate = dayjs().startOf("day");

const groupedSchedules = schedules
  .filter((schedule) => {
    const scheduleDate = dayjs(schedule.when);
    return scheduleDate.isAfter(currentDate, "day");
  })
```

Explicacao:

- a comparacao usa `startOf("day")` como referencia;
- `isAfter(currentDate, "day")` compara apenas o dia;
- isso impede que um horario de hoje apareca em `Próximos Agendamentos`.

#### Ordenacao

```js
.sort(
  (firstSchedule, secondSchedule) =>
    dayjs(firstSchedule.when).valueOf() - dayjs(secondSchedule.when).valueOf(),
)
```

Explicacao:

- ordena por data e horario;
- facilita leitura e agrupamento posterior.

#### Agrupamento

```js
.reduce((groups, schedule) => {
  const dateKey = dayjs(schedule.when).format("YYYY-MM-DD");

  if (!groups[dateKey]) {
    groups[dateKey] = [];
  }

  groups[dateKey].push(schedule);
  return groups;
}, {});
```

Explicacao:

- transforma uma lista simples em grupos por dia;
- deixa a renderizacao mais organizada.

#### Estado vazio

```js
if (!groupedEntries.length) {
  const emptyState = document.createElement("p");
  emptyState.classList.add("upcoming-empty");
  emptyState.textContent = "Nenhum agendamento futuro cadastrado.";
  upcomingGroups.append(emptyState);
  return;
}
```

Explicacao:

- evita bloco vazio sem explicacao;
- melhora usabilidade quando nao ha proximos agendamentos.

#### Montagem dos grupos

```js
groupedItems.forEach((schedule) => {
  list.append(createScheduleItem(schedule));
});
```

Explicacao:

- `forEach` percorre os itens do grupo;
- `createScheduleItem()` padroniza cada linha renderizada.

### `src/modules/schedules/cancel.js`

#### Delegacao de evento

```js
const schedule = document.querySelector(".schedule");

schedule.addEventListener("click", async (event) => {
  if (event.target.classList.contains("cancel-icon")) {
```

Explicacao:

- um unico listener atende tanto a agenda do dia quanto os proximos agendamentos;
- isso funciona mesmo para elementos criados dinamicamente depois.

#### Fluxo de exclusao

```js
await scheduleCancel({ id });
await schedulesDay();
```

Explicacao:

- remove o item na API;
- recarrega os dois containers e os horarios do formulario.

### `src/styles/schedule.css`

#### Bloco visual dos proximos

```css
.upcoming-schedules {
  margin-top: 1.5rem;
}

.upcoming-groups {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
```

Explicacao:

- cria espacamento visual entre agenda do dia e proximos;
- organiza os grupos futuros em coluna.

#### Estado vazio

```css
.upcoming-empty {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background-color: rgba(255, 255, 255, 0.01);
}
```

Explicacao:

- mantem coerencia visual com os outros cards;
- evita que a mensagem de vazio pareca um elemento solto.

---

## Regras de negocio

- O campo de data do formulario nao permite datas passadas.
- O nome do cliente e obrigatorio.
- O usuario precisa selecionar um horario antes de agendar.
- Horario nao pode ser duplicado na mesma data.
- Horarios passados ficam indisponiveis.
- Horarios ja ocupados ficam indisponiveis.
- Agenda do Dia mostra apenas agendamentos da data atual do sistema.
- Proximos Agendamentos mostra somente datas futuras.
- Um agendamento nao pode aparecer nos dois containers ao mesmo tempo.
- A exclusao pode ocorrer tanto na Agenda do Dia quanto nos Proximos Agendamentos.
- Ao excluir um agendamento, ambos os containers sao atualizados automaticamente.
- Ao criar um agendamento, os horarios disponiveis sao recalculados.
- A lista de proximos agendamentos e ordenada por data e horario.
- A lista de proximos agendamentos e agrupada por dia.
- A aplicacao reaproveita uma unica carga de dados para atualizar varios blocos da tela.

---

## O que aprendi neste projeto

- Organizacao de projeto por responsabilidade.
- Separacao entre estrutura, estilo, servicos e modulos.
- Manipulacao de DOM com JavaScript puro.
- Tratamento de eventos (`submit`, `change`, `click`, `DOMContentLoaded`).
- Comunicacao com API usando `fetch`.
- Uso de `dayjs` para comparacao e formatacao de datas.
- Validacao de formulario.
- Validacao de conflito de horario.
- Renderizacao dinamica de listas.
- Uso de `map`, `filter`, `reduce`, `some` e `forEach`.
- Delegacao de evento.
- Recalculo de horarios disponiveis.
- Ordenacao e agrupamento de dados.
- Aplicacao de regras de negocio na interface.
- Responsividade com CSS.
- Uso de build com webpack.
- Uso de API fake com json-server.
- Documentacao tecnica como material de estudo.
