// Importa a configuração central da API para evitar repetir a URL base em vários arquivos.
import { apiConfig } from "./api-config.js";

// Exporta a função para que outros módulos possam criar um novo agendamento.
// O parâmetro é desestruturado para receber apenas os campos necessários do agendamento.
export async function scheduleNew({ id, name, when }) {
  // Inicia um bloco de tentativa para capturar falhas da requisição e tratar o erro sem quebrar a aplicação.
  try {
    // Faz uma requisição HTTP para a rota de agendamentos usando a URL base configurada no projeto.
    const response = await fetch(`${apiConfig.baseUrl}/schedules`, {
      // Define que a operação será de criação de um novo recurso no servidor.
      method: "POST",
      // Agrupa os cabeçalhos da requisição para informar metadados ao servidor.
      headers: {
        // Informa que o corpo enviado está no formato JSON.
        "Content-Type": "application/json",
      },
      // Converte o objeto JavaScript em texto JSON para ser enviado no corpo da requisição.
      body: JSON.stringify({ id, name, when }),
    });

    // Valida o status HTTP porque o fetch nao dispara excecao automaticamente para respostas 4xx/5xx.
    if (!response.ok) {
      throw new Error(`Falha ao criar agendamento: ${response.status}`);
    }

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
