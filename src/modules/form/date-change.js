import { schedulesDay } from "../schedules/load";

// Selecionar o input de data
const selectedDate = document.getElementById("date");

// Recarregar a lista de tarefas quando a data for alterada
selectedDate.onchange = () => {
  schedulesDay(selectedDate.value);
};
