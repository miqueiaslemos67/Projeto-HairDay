import dayjs from "dayjs";
import { openingHours } from "../../utils/opening-hours.js";
import { hoursClick } from "./hours-click.js";

const hours = document.getElementById("hours");

export function hoursLoad({ date, dailySchedules = [] }) {
  hours.innerHTML = "";

  const now = dayjs();
  const bookedHours = dailySchedules.map((schedule) => dayjs(schedule.when).format("HH:mm"));

  const opening = openingHours.map((hour) => {
    const [scheduleHour, scheduleMinute] = hour.split(":");

    // Antes o codigo somava horas na data e depois invertia a comparacao.
    // Isso fazia horarios futuros aparecerem como indisponiveis.
    const scheduleDate = dayjs(date)
    // Funcao set() do dayjs nao altera a data original, ela retorna uma nova instancia com a data alterada.
      .set("hour", Number(scheduleHour))
      .set("minute", Number(scheduleMinute))
      .set("second", 0);

    const isHourPast = scheduleDate.isBefore(now);
    const isHourBooked = bookedHours.includes(hour);

    return {
      hour,
      available: !isHourPast && !isHourBooked,
    };
  });

  opening.forEach(({ hour, available }) => {
    const li = document.createElement("li");

    li.classList.add("hour");
    li.classList.add(available ? "hour-available" : "hour-unavailable");
    li.textContent = hour;

    if (hour === "09:00") {
      hourHeaderAdd("Manhã");
    } else if (hour === "13:00") {
      hourHeaderAdd("Tarde");
    } else if (hour === "18:00") {
      hourHeaderAdd("Noite");
    }

    hours.appendChild(li);
  });

  hoursClick();
}

function hourHeaderAdd(title) {
  const header = document.createElement("li");
  header.classList.add("hour-period");
  header.textContent = title;
  hours.appendChild(header);
}
