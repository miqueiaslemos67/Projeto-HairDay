// dayjs é uma biblioteca para manipulação de datas em JavaScript
import dayjs from "dayjs";

// Importa a configuração da API, que contém a URL base para as requisições
import { apiConfig } from "./api-config";

// Função para buscar os horários disponíveis para um dia específico
export async function scheduleFetchByDay({ date, withAllSchedules = false }) {
  // Converte a data fornecida para o formato "YYYY-MM-DD" usando dayjs
  try {
    // Faz uma requisição para a API para buscar os horários disponíveis para o dia especificado,
    const response = await fetch(`${apiConfig.baseUrl}/schedules`);

    if (!response.ok) {
      throw new Error(`Falha ao buscar agendamentos: ${response.status}`);
    }

    // Filtra os horários disponíveis para o dia especificado, pelo dia especificado
    const schedules = await response.json();

    // Filtra os horários disponíveis para o dia especificado, usando dayjs para comparar as datas
    const dailySchedules = schedules.filter((schedule) =>
      dayjs(date).isSame(schedule.when, "day"),
    );

    if (withAllSchedules) {
      return {
        dailySchedules,
        allSchedules: schedules,
      };
    }

    return dailySchedules;
  } catch (error) {
    console.log(error);
    alert(
      "Ocorreu um erro ao buscar os horários disponíveis. Por favor, tente novamente mais tarde.",
    );

    if (withAllSchedules) {
      return {
        dailySchedules: [],
        allSchedules: [],
      };
    }

    return [];
  }
}
