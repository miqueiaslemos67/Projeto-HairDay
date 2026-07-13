import { scheduleCancel } from "../../services/schedule-cancel.js";
import { schedulesDay } from "./load.js";

const schedule = document.querySelector(".schedule");

// Captura cliques nos períodos atuais e nos próximos agendamentos usando delegação de evento.
schedule.addEventListener("click", async (event) => {
  if (event.target.classList.contains("cancel-icon")) {
    // Obtém a li pai do elemento clicado, que representa o agendamento a ser cancelado
    const item = event.target.closest("li");
    const { id } = item.dataset; // Obtém o ID do agendamento a partir do dataset do elemento li

    // Confirma com o usuário se ele deseja realmente cancelar o agendamento
    if (id) {
      const isConfirm = confirm(
        "Tem certeza que deseja cancelar o agendamento?",
      );

      if (isConfirm) {
        // Se o usuário confirmar, envia uma requisição para cancelar o agendamento.
        await scheduleCancel({ id });
        await schedulesDay(); // Atualiza a lista de agendamentos após o cancelamento
      }
    }
  }
});
