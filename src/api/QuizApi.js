class QuizApi {
  static async fetchQuestions() {
    const apiUrl = "https://d1.global-polluelo5v.workers.dev/frases";

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Error al obtener las preguntas: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al llamar a la API:", error);
      throw error;
    }
  }
}

export default QuizApi;