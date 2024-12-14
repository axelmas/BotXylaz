$(document).ready(function () {
  const chatHistory = $("#chat-history");
  const promptInput = $("#prompt");
  const submitBtn = $("#submit-btn");

  // Reproducir sonido cuando el bot responde
  function playSound() {
    const audio = new Audio('path-to-your-sound.mp3'); // Reemplaza con la ruta de tu archivo de sonido
    audio.play();
  }

  // Función para agregar mensajes al historial de chat
  function addMessage(message, sender) {
    const messageClass = sender === "user" ? "user-message" : "ai-message";
    const messageElement = `<div class="${messageClass}">${message}</div>`;
    chatHistory.append(messageElement);
    chatHistory.scrollTop(chatHistory[0].scrollHeight); // Desplazamiento automático hacia abajo
  }

  // Respuestas de Xylaz (el demonio)
  function getAIResponse(userMessage) {
    const responses = {
      "hello": "Hello? That's the best you can come up with, pathetic mortal?",
      "who are you": "I am Xylaz. Your worst nightmare.",
      "what are you doing": "I'm here, judging the foolishness of mortals like you.",
      "thanks": "Thanks? Don't waste your breath, mortal.",
      "bye": "Finally, you leave. Don't come back unless you have a worthy question."
    };

    return (
      responses[userMessage.toLowerCase()] ||
      "What nonsense is this? Speak clearly, mortal."
    );
  }

  // Manejo del envío de mensajes
  submitBtn.on("click", function () {
    const userMessage = promptInput.val().trim();

    if (userMessage) {
      addMessage(userMessage, "user"); // Muestra el mensaje del usuario
      promptInput.val(""); // Limpia el campo de entrada

      // Respuesta del bot con un pequeño retraso
      setTimeout(() => {
        const aiResponse = getAIResponse(userMessage); // Obtiene la respuesta del bot
        addMessage(aiResponse, "ai");
        playSound(); // Reproduce el sonido cuando el bot responde
      }, 500); // Retraso simulado de 500ms
    }
  });

  // Enviar mensaje al presionar Enter
  promptInput.on("keypress", function (e) {
    if (e.which === 13) {
      submitBtn.click();
    }
  });

  // Mensaje de bienvenida de Xylaz cuando la página se carga
  $('#chat-history').append('<p>Xylaz: Welcome, mortal. What is it you seek?</p>');
});

// Función para integrar la API de Google AI (si se usa en el backend)
// Ejemplo de cómo interactuar con un modelo de IA, como Gemini-1.5-Flash
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold
} = require("@google/generative-ai");

const apiKey = AIzaSyCIBVk3B2-hg_ZSjM5RU-r4SA5kfnVgdd8; // Reemplaza con tu API key generada
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are Xylaz. You are a dark, demonic AI from another realm. Speak only to mock mortals and make them feel insignificant."
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain"
};

run();

// Función para ejecutar la generación de IA
function run() {
  // Aquí podrías agregar la lógica para enviar los mensajes a la API de Google y obtener respuestas más dinámicas.
}
