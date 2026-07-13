// Importação do arquivo de configuração da API
import { apiConfig } from "./api-config.js";

// Exportação da função assíncrona scheduleCancel, que recebe um objeto com a propriedade id
export async function scheduleCancel({ id }) {
  try {

    // Faz uma requisição GET para obter todos os agendamentos
    const schedulesResponse = await fetch(`${apiConfig.baseUrl}/schedules`);

    // Verifica se a resposta da requisição foi bem-sucedida
    if (!schedulesResponse.ok) {
      throw new Error(`Falha ao localizar agendamento: ${schedulesResponse.status}`);
    }

    // Converte a resposta em JSON e procura o agendamento com o ID fornecido
    const schedules = await schedulesResponse.json();
    const schedule = schedules.find(
      (item) => String(item.id) === String(id),
    );

    if (!schedule) {
      throw new Error("Agendamento nao encontrado para cancelamento.");
    }

    // Faz uma requisição DELETE para cancelar o agendamento
    const response = await fetch(`${apiConfig.baseUrl}/schedules/${schedule.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Falha ao cancelar agendamento: ${response.status}`);
    }

    alert("Agendamento cancelado com sucesso!");
  } catch (error) {
    console.error("Erro ao cancelar agendamento:", error);
    alert(
      "Ocorreu um erro ao cancelar o agendamento. Por favor, tente novamente mais tarde.",
    );
  }
}
