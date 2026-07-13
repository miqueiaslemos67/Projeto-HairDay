// Função para lidar com o clique em um horário disponível  e marcar como selecionado.
export function hoursClick() {
  // Constante que seleciona todos os elementos com a classe "hour-available" (horários disponíveis) na página.
  const hours = document.querySelectorAll(".hour-available");
  // Constante e metodo que adiciona um evento de clique a cada horário disponível. Quando um horário é clicado, ele alterna a classe "hour-selected" para marcar ou desmarcar o horário como selecionado.
  hours.forEach((available) => {
    available.addEventListener("click", (selected) => {
      
      // Remove a classe "hour-selected" de todos os horários disponíveis para garantir que apenas um horário possa ser selecionado por vez.
      hours.forEach((hour) => {
        hour.classList.remove("hour-selected");
      });

      // Adiciona a classe "hour-selected" ao horário clicado.
      selected.target.classList.add("hour-selected");

    });
  });
}
