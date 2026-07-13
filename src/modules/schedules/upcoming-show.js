// Arquivo responsável por renderizar os agendamentos futuros na tela inicial do sistema.

import dayjs from "dayjs";

// Elemento HTML que conterá os grupos de agendamentos futuros.
const upcomingGroups = document.getElementById("upcoming-groups");


// Função que retorna o rótulo do grupo de agendamentos com base na data fornecida.
function getGroupLabel(date, referenceDate) {
  if (date.isSame(referenceDate, "day")) {
    return "Hoje";
  }

  if (date.isSame(referenceDate.add(1, "day"), "day")) {
    return "Amanhã";
  }

  return date.format("DD/MM/YYYY");
}


// Função que cria um item de agendamento na lista de agendamentos futuros.
function createScheduleItem(schedule) {
  const item = document.createElement("li");
  const time = document.createElement("strong");
  const name = document.createElement("span");
  const deleteIcon = document.createElement("img");

  item.setAttribute("data-id", schedule.id);

  time.textContent = dayjs(schedule.when).format("HH:mm");
  name.textContent = schedule.name;

  deleteIcon.classList.add("cancel-icon");
  deleteIcon.setAttribute("src", "./src/assets/cancel.svg");
  deleteIcon.setAttribute("alt", "Cancelar agendamento");

  item.append(time, name, deleteIcon);

  return item;
}

// Função principal que renderiza os agendamentos futuros na tela inicial do sistema.
export function upcomingSchedulesShow({ schedules }) {
  upcomingGroups.innerHTML = "";
  const currentDate = dayjs().startOf("day");

  const groupedSchedules = schedules
    .filter((schedule) => {
      const scheduleDate = dayjs(schedule.when);
      return scheduleDate.isAfter(currentDate, "day");
    })
    .sort(
      (firstSchedule, secondSchedule) =>
        dayjs(firstSchedule.when).valueOf() - dayjs(secondSchedule.when).valueOf(),
    )
    .reduce((groups, schedule) => {
      const dateKey = dayjs(schedule.when).format("YYYY-MM-DD");

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }

      groups[dateKey].push(schedule);
      return groups;
    }, {});

  const groupedEntries = Object.entries(groupedSchedules);

  if (!groupedEntries.length) {
    const emptyState = document.createElement("p");
    emptyState.classList.add("upcoming-empty");
    emptyState.textContent = "Nenhum agendamento futuro cadastrado.";
    upcomingGroups.append(emptyState);
    return;
  }

  groupedEntries.forEach(([dateKey, groupedItems]) => {
    const group = document.createElement("section");
    const header = document.createElement("header");
    const icon = document.createElement("img");
    const title = document.createElement("strong");
    const amount = document.createElement("span");
    const list = document.createElement("ul");
    const groupDate = dayjs(dateKey);

    group.classList.add("schedule-period", "upcoming-group");
    list.classList.add("period");

    icon.setAttribute("src", "./src/assets/calendar.svg");
    icon.setAttribute("alt", "");
    title.textContent = getGroupLabel(groupDate, currentDate);
    amount.textContent = `${groupedItems.length} agendamento${groupedItems.length > 1 ? "s" : ""}`;

    header.append(icon, title, amount);

    groupedItems.forEach((schedule) => {
      list.append(createScheduleItem(schedule));
    });

    group.append(header, list);
    upcomingGroups.append(group);
  });
}
