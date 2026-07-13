# Explicacao - Proximos Agendamentos

## Por que a logica foi alterada

- Antes, ao selecionar uma data futura no formulario e criar um agendamento, ele podia aparecer ao mesmo tempo em `Agendamentos do Dia` e em `Proximos Agendamentos`.
- Isso acontecia porque o primeiro bloco ainda dependia da data selecionada no formulario.
- A regra foi ajustada para eliminar essa duplicidade e separar melhor o que acontece hoje do que acontece nos proximos dias.
- Agora a interface comunica com mais clareza:
  - `Agendamentos do Dia` mostra somente os atendimentos de hoje;
  - `Proximos Agendamentos` mostra somente os atendimentos depois de hoje.

## Arquivos alterados

### `index.html`
- O titulo do primeiro bloco foi ajustado para `Agendamentos do Dia`.
- O texto de apoio desse bloco foi atualizado para deixar claro que ele mostra apenas os atendimentos de hoje.
- Foi adicionada uma nova secao chamada `Proximos Agendamentos` dentro do mesmo `aside` que ja exibe a lista principal.
- Ela usa o container `#upcoming-groups`, que comeca vazio e recebe os grupos de agendamentos via JavaScript.
- Essa escolha preserva a estrutura atual da tela e posiciona o novo bloco logo abaixo de `Agendamentos`, mantendo a responsividade existente.

### `src/styles/schedule.css`
- Foram criadas as classes do novo bloco: `.upcoming-schedules`, `.upcoming-header`, `.upcoming-groups`, `.upcoming-group` e `.upcoming-empty`.
- Os estilos reaproveitam o visual ja existente da tela: mesmas cores, tipografia, bordas, espacamentos e estrutura dos cards.
- Tambem foi mantido o `cursor: pointer` em `.cancel-icon`, para o icone de exclusao continuar com o comportamento visual correto.

### `src/services/schedule-fetch-by-day.js`
- A funcao `scheduleFetchByDay` passou a aceitar a opcao `withAllSchedules`.
- Quando essa opcao e `true`, a funcao retorna dois resultados ao mesmo tempo:
  - `dailySchedules`: agendamentos filtrados pela data informada na chamada
  - `allSchedules`: lista completa carregada da API
- Isso evita fazer uma nova busca so para o bloco de proximos agendamentos.

### `src/modules/schedules/load.js`
- Esse arquivo continua sendo o ponto central de atualizacao da agenda.
- Agora ele usa uma unica busca para:
  - renderizar a lista principal com os agendamentos de hoje;
  - renderizar o bloco `Proximos Agendamentos`;
  - atualizar os horarios disponiveis com base na data selecionada no formulario.
- Assim, a aplicacao continua sincronizada sem criar estados paralelos.
- Tambem passou a atualizar a data exibida visualmente no primeiro bloco com a data atual do sistema.

### `src/modules/schedules/upcoming-show.js`
- Esse novo arquivo contem apenas a logica visual do bloco `Proximos Agendamentos`.
- Ele recebe a lista completa de agendamentos, filtra apenas os futuros, ordena, agrupa por data e monta o HTML dinamicamente.
- O filtro foi corrigido para comparar apenas o dia, ignorando hora, minuto e segundo.
- Tambem reutiliza o mesmo icone de exclusao usado na lista principal.

## Correcao do filtro de proximos agendamentos

1. Qual era o problema.
- Um agendamento criado para hoje podia aparecer tambem em `Proximos Agendamentos`.
- Isso acontecia porque a comparacao estava considerando o horario completo do agendamento contra `hoje` no inicio do dia.
- Exemplo: um atendimento hoje as `14:00` era interpretado como maior que `hoje 00:00`.

2. Qual filtro estava incorreto.
- O filtro usava esta comparacao:

```js
return scheduleDate.isAfter(currentDate);
```

- Como `currentDate` estava em `startOf("day")`, qualquer horario posterior do mesmo dia ainda era considerado `isAfter`.

3. Como a regra ficou agora.
- A comparacao passou a ser feita por granularidade de dia:

```js
return scheduleDate.isAfter(currentDate, "day");
```

- Agora o bloco `Proximos Agendamentos` mostra somente itens com `data > hoje`.
- Agendamentos com `data == hoje` ficam exclusivamente em `Agendamentos do Dia`.

4. Por que agendamentos de hoje nao devem aparecer em proximos agendamentos.
- Porque isso duplica a informacao na interface.
- O objetivo dos containers e separar claramente:
  - o que sera atendido hoje;
  - o que esta reservado para amanha em diante.
- Quando um agendamento de hoje aparece em `Proximos Agendamentos`, o usuario perde essa distincao e a tela fica confusa.

### `src/modules/schedules/cancel.js`
- O clique de exclusao deixou de ser registrado somente nos `.period` existentes no carregamento inicial.
- Agora foi usada delegacao de evento no container `.schedule`.
- Com isso, tanto os itens da lista principal quanto os itens do novo bloco podem ser removidos com o mesmo comportamento.

## Como funciona a logica para buscar os agendamentos futuros

1. A funcao `schedulesDay()` calcula a data atual do sistema.
2. Ela chama `scheduleFetchByDay({ date: today, withAllSchedules: true })`.
3. Essa chamada faz apenas uma requisicao para `/schedules`.
4. A resposta completa vira `allSchedules`.
5. A partir dessa lista unica, a aplicacao separa:
   - os agendamentos de hoje;
   - os agendamentos da data selecionada no formulario;
   - os agendamentos futuros.

Resumo:
- `Agendamentos do Dia` usa apenas itens com `data == hoje`;
- o formulario continua usando a `data selecionada` para montar os horarios disponiveis;
- `Proximos Agendamentos` usa apenas itens com `data > hoje`.

## Como ficou a separacao entre os dois containers

### `Agendamentos do Dia`
- Mostra somente agendamentos cuja data seja igual a hoje.
- Continua agrupando por manha, tarde e noite.
- Nao depende mais da data escolhida no formulario.
- Mesmo que o usuario selecione uma data futura para criar um novo atendimento, esse agendamento nao aparece nesse bloco.

### `Proximos Agendamentos`
- Mostra somente agendamentos com data maior que hoje.
- Nao inclui mais os agendamentos do dia atual.
- Continua ordenando por data e horario antes de agrupar por dia.

Com isso, nenhum agendamento aparece simultaneamente nos dois blocos.

## Como o formulario passou a se comportar

- O campo de data continua existindo normalmente.
- Ele continua sendo usado para:
  - criar novos agendamentos;
  - verificar conflitos de horario;
  - montar os horarios disponiveis no formulario.
- Ele nao controla mais o conteudo exibido em `Agendamentos do Dia`.

## Como ocorre a ordenacao

No arquivo `src/modules/schedules/upcoming-show.js`, os agendamentos futuros sao ordenados com base no valor completo da data e hora:

```js
.sort(
  (firstSchedule, secondSchedule) =>
    dayjs(firstSchedule.when).valueOf() - dayjs(secondSchedule.when).valueOf(),
)
```

Isso garante a ordem correta por:
1. data;
2. horario.

## Como ocorre o agrupamento por data

Depois da ordenacao, a lista passa por um `reduce`.

Cada agendamento gera uma chave no formato `YYYY-MM-DD`:

```js
const dateKey = dayjs(schedule.when).format("YYYY-MM-DD");
```

Essa chave e usada para montar um objeto de grupos, por exemplo:

```js
{
  "2026-07-11": [/* agendamentos do dia */],
  "2026-07-12": [/* agendamentos do dia */]
}
```

Depois, cada grupo vira uma secao visual independente com:
- icone de calendario;
- titulo (`Amanha` ou `DD/MM/YYYY`);
- quantidade de agendamentos;
- lista de clientes e horarios.

## Como o componente permanece sincronizado com a lista principal

O segredo da sincronizacao continua em `schedulesDay()`.

Sempre que um agendamento e criado:
- `src/modules/form/submit.js` chama `schedulesDay()` ao final.

Sempre que um agendamento e excluido:
- `src/modules/schedules/cancel.js` chama `await schedulesDay()` depois do `DELETE`.

Como `schedulesDay()` agora atualiza:
- os agendamentos de hoje;
- os proximos agendamentos;
- os horarios do formulario,

toda a interface continua sincronizada automaticamente com uma unica fonte de dados.

## Resultado final

- A duplicidade de exibicao foi removida.
- O primeiro bloco agora mostra somente o que sera atendido hoje.
- O segundo bloco agora mostra somente o que esta agendado para depois de hoje.
- O formulario continua funcionando para criar atendimentos em qualquer data permitida.
- A aplicacao segue reaproveitando a mesma busca de dados para evitar trabalho desnecessario.
