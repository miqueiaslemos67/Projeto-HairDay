import dayjs from "dayjs";

import { scheduleNew } from "../../services/schedule-new.js"; // Importa a função scheduleNew do arquivo de serviços para ser usada no envio do formulário.
import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js";

import { schedulesDay } from "../schedules/load.js"; // Importa o módulo de carregamento de agendamentos, mas não utiliza nenhuma função específica dele neste arquivo.

// Seleciona os elementos do formulário, o campo de nome do cliente e o campo de data.
const form = document.querySelector("form");
const clientName = document.getElementById("client");
const selectDate = document.getElementById("date");

const inputToday = dayjs().format("YYYY-MM-DD");

// Define o valor mínimo do campo de data como a data atual, para evitar que o usuário selecione datas passadas.
selectDate.value = inputToday;
selectDate.min = inputToday;

// Adiciona um evento de envio ao formulário, que será acionado quando o usuário tentar enviar os dados.
form.onsubmit = async (event) => {
  event.preventDefault();

  try {
    // Obtém o valor do nome do cliente e da data selecionada, removendo espaços em branco desnecessários.
    const name = clientName.value.trim();
    const date = selectDate.value;

    // Antes a validacao usava uma variavel inexistente chamada `date`.
    // Agora a verificacao usa a data real do input.
    if (!name || !date) {
      alert("Por favor, preencha todos os campos do formulário.");
      return;
    }

    // Verifica se o usuário selecionou um horário disponível. Se não houver um horário selecionado, exibe um alerta e interrompe o envio do formulário.
    const hourSelected = document.querySelector(".hour-selected");

    if (!hourSelected) {
      alert("Por favor, selecione um horário disponível.");
      return;
    }
    // Divide o horário selecionado em hora e minuto, usando o caractere ":" como separador.
    const [hour, minute] = hourSelected.textContent.split(":");

    // Cria um objeto dayjs com a data e hora selecionadas, definindo os valores de hora e minuto, e formatando para o padrão ISO 8601.
    const when = dayjs(date)
      .set("hour", Number(hour))
      .set("minute", Number(minute))
      .set("second", 0)
      .format();

    const dailySchedules = await scheduleFetchByDay({ date });
    const hasScheduleConflict = dailySchedules.some(
      (schedule) =>
        dayjs(schedule.when).format("HH:mm") === `${hour}:${minute}`,
    );

    if (hasScheduleConflict) {
      alert("Esse horario ja esta agendado para a data selecionada.");
      await schedulesDay();
      return;
    }

    // Gera um ID único para o agendamento usando o timestamp atual em milissegundos.
    const id = String(new Date().getTime());

    // Chama a função scheduleNew para enviar os dados do agendamento para o servidor, passando o ID, nome do cliente e data/hora selecionada. fazendo o agendamento no backend.
    await scheduleNew({ id, name, when });

    // Chama a função schedulesDay para atualizar a lista de agendamentos do dia, garantindo que o novo agendamento seja exibido corretamente.
    await schedulesDay();

    // limpa o input do nome do cliente e o campo de data, preparando o formulário para um novo envio.
    clientName.value = "";
  } catch (error) {
    alert("Erro ao enviar o formulário:" + error.message);
  }
};
