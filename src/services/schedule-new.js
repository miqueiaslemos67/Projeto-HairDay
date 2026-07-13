import { createSchedule } from "./schedules-storage.js";

// Exporta a função para que outros módulos possam criar um novo agendamento.
// O parâmetro é desestruturado para receber apenas os campos necessários do agendamento.
export async function scheduleNew({ id, name, when }) {
  // Inicia um bloco de tentativa para capturar falhas da requisição e tratar o erro sem quebrar a aplicação.
  try {
    // Faz uma requisição HTTP para a rota de agendamentos usando a URL base configurada no projeto.
    await createSchedule({ id, name, when });

    // Exibe um alerta simples para avisar ao usuário que o agendamento foi concluído.
    alert("Horário agendado com sucesso!");
  } catch (error) {
    // Mostra o erro no console para facilitar a depuração durante o desenvolvimento.
    console.error("Erro ao agendar novo horário:", error);
    // Informa ao usuário que a operação falhou sem expor detalhes técnicos do erro.
    alert(
      "Ocorreu um erro ao tentar agendar o horário. Por favor, tente novamente mais tarde.",
    );
  }
}
