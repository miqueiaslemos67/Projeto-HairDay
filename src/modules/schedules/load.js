import dayjs from "dayjs";
import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js";
import { schedulesShow } from "../schedules/show.js";
import { upcomingSchedulesShow } from "../schedules/upcoming-show.js";
import { hoursLoad } from "../form/hours-load.js";

const selectedDate = document.getElementById("date");
const scheduleDateLabel = document.querySelector(".schedule-date span");

export async function schedulesDay() {
  const date = selectedDate.value;
  const today = dayjs().format("YYYY-MM-DD");

  // Carrega os dados uma única vez e reaproveita a lista completa para separar os agendamentos de hoje e os horarios da data escolhida no formulario.
  const { allSchedules } = await scheduleFetchByDay({
    date: today,
    withAllSchedules: true,
  });

  const dailySchedules = allSchedules.filter((schedule) =>
    dayjs(today).isSame(schedule.when, "day"),
  );

  const selectedDateSchedules = allSchedules.filter((schedule) =>
    dayjs(date).isSame(schedule.when, "day"),
  );

  scheduleDateLabel.textContent = dayjs(today).format("DD/MM/YYYY");

  // Exibe apenas os horários agendados para hoje no container principal.
  schedulesShow({ dailySchedules });

  // Exibe apenas os agendamentos com data futura no resumo de próximos atendimentos.
  upcomingSchedulesShow({ schedules: allSchedules });

  // Mantém o formulario usando a data selecionada para montar os horarios disponiveis de criacao.
  hoursLoad({ date, dailySchedules: selectedDateSchedules });
}
