import { listSchedules, removeScheduleById } from "./schedules-storage.js";

// Exportação da função assíncrona scheduleCancel, que recebe um objeto com a propriedade id
export async function scheduleCancel({ id }) {
  try {

    // Faz uma requisição GET para obter todos os agendamentos
    const schedules = await listSchedules();
    const schedule = schedules.find(
      (item) => String(item.id) === String(id),
    );

    if (!schedule) {
      throw new Error("Agendamento nao encontrado para cancelamento.");
    }

    await removeScheduleById(schedule.id);

    alert("Agendamento cancelado com sucesso!");
  } catch (error) {
    console.error("Erro ao cancelar agendamento:", error);
    alert(
      "Ocorreu um erro ao cancelar o agendamento. Por favor, tente novamente mais tarde.",
    );
  }
}
