// Importa a biblioteca dayjs para manipulação de datas e horários
import dayjs from "dayjs";

// Seleciona as seções do DOM que serão manipuladas
const periodMorning = document.getElementById("period-morning");
const periodAfternoon = document.getElementById("period-afternoon");
const periodNight = document.getElementById("period-night");

// Função para exibir os horários disponíveis para o dia especificado
export function schedulesShow({ dailySchedules }) {
  try {
    // Limpa as seções antes de exibir os horários
    periodMorning.innerHTML = "";
    periodAfternoon.innerHTML = "";
    periodNight.innerHTML = "";

    // Renderiza os horários disponíveis para cada período do dia
    dailySchedules.forEach((schedule) => {
      const item = document.createElement("li");
      const time = document.createElement("strong");
      const name = document.createElement("span");

      // Adicionar o Id do agendamento como atributo data-id
      item.setAttribute("data-id", schedule.id);

      time.textContent = dayjs(schedule.when).format("HH:mm");
      name.textContent = schedule.name;

      // Criar o icone de exclusão
      const deleteIcon = document.createElement("img");
      deleteIcon.classList.add("cancel-icon");
      deleteIcon.setAttribute("src", "./src/assets/cancel.svg");
      deleteIcon.setAttribute("alt", "Cancelar agendamento");

      // Adicionar o tempo e o nome do cliente ao item da lista
      item.append(time, name, deleteIcon);

      // Obtém somente a hora do agendamento para determinar o período do dia
      const hour = dayjs(schedule.when).hour();

      // Renderiza o agendamento na sessão correta com base na hora(Manhã, Tarde ou Noite)

      // Se a hora for menor ou igual a 12, adiciona na seção da manhã, // se for maior que 12 e menor que 18, adiciona na seção da tarde, // caso contrário, adiciona na seção da noite.
      if (hour <= 12) {
        periodMorning.appendChild(item);
      } else if (hour > 12 && hour < 18) {
        periodAfternoon.appendChild(item);
      } else {
        periodNight.appendChild(item);
      }
    });
  } catch (error) {
    console.log(error);
    alert(
      "Ocorreu um erro ao exibir os horários disponíveis. Por favor, tente novamente mais tarde.",
    );
  }
}
