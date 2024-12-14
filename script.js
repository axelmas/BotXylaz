$(document).ready(function () {
  const apiKey = "YOUR_API_KEY_HERE"; // Reemplaza con tu clave API
  const {
    GoogleGenerativeAI,
  } = require("@google/generative-ai");

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are an AI called Xylaz. You are dark, scary, and sarcastic. Speak directly to the user. Avoid politeness, and don't describe the world around you.",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 100, // Ajusta según tu necesidad
    responseMimeType: "text/plain",
  };

  const chatHistory = $("#chat-history");
  const promptInput = $("#prompt");
  const submitBtn = $("#submit-btn");

  // Mostrar un mensaje de saludo inicial
  chatHistory.append('<div class="ai-message">I am Xylaz. Speak wisely, mortal.</div>');

  // Función para añadir mensajes al historial de chat
  function addMessage(message, sender) {
    const messageClass = sender === "user" ? "user-message" : "ai-message";
    const messageElement = `<div class="${messageClass}">${message}</div>`;
    chatHistory.append(messageElement);
    chatHistory.scrollTop(chatHistory[0].scrollHeight); // Auto-scroll hacia abajo
  }

  // Función para procesar respuestas del modelo
  async function getAIResponse(userMessage) {
    try {
      const response = await model.generateText({
        ...generationConfig,
        prompt: userMessage,
      });

      if (response && response.candidates && response.candidates.length > 0) {
        return response.candidates[0].output;
      } else {
        return "Xylaz is not in the mood to talk right now.";
      }
    } catch (error) {
      console.error("Error with AI response:", error);
      return "Something went wrong. Xylaz is displeased.";
    }
  }

  // Manejo del botón de envío
  submitBtn.on("click", async function () {
    const userMessage = promptInput.val().trim();
    if (userMessage) {
      addMessage(userMessage, "user"); // Mostrar el mensaje del usuario
      promptInput.val(""); // Limpiar el campo de entrada

      // Generar y mostrar la respuesta de Xylaz
      const aiResponse = await getAIResponse(userMessage);
      addMessage(aiResponse, "ai");
    }
  });

  // Enviar mensaje al presionar Enter
  promptInput.on("keypress", function (e) {
    if (e.which === 13) {
      submitBtn.click();
    }
  });
});$(document).ready(function () {
  const chatHistory = $("#chat-history");
  const promptInput = $("#prompt");
  const submitBtn = $("#submit-btn");

  // Function to add messages to the chat history
  function addMessage(message, sender) {
    const messageClass = sender === "user" ? "user-message" : "ai-message";
    const messageElement = `<div class="${messageClass}">${message}</div>`;
    chatHistory.append(messageElement);
    chatHistory.scrollTop(chatHistory[0].scrollHeight); // Auto-scroll to the bottom
  }

  // Function to play a sound when bot responds
  function playSound() {
    const audio = new Audio('sounds/response-sound.mp3'); // Make sure this path is correct
    audio.play();
  }

  // Devil's responses
  function getAIResponse(userMessage) {
    const responses = {
      "hello": "Hello? That's the best you can come up with, pathetic human?",
      "who are you": "I'm your worst nightmare. Don't ask questions you can't handle.",
      "what are you doing": "Condemning souls... and dealing with your pointless chatter.",
      "thanks": "Thanks? Hah. Save your gratitude, I don't need it.",
      "bye": "Finally. Leave before I lose my temper.",
    };

    return (
        responses[userMessage.toLowerCase()] ||
        "What kind of nonsense is this? Speak clearly, mortal."
    );
  }

  // Handle message sending
  submitBtn.on("click", function () {
    const userMessage = promptInput.val().trim();

    if (userMessage) {
      addMessage(userMessage, "user"); // Display the user's message
      promptInput.val(""); // Clear the input field

      // Show the devil's response after a short delay
      setTimeout(() => {
        const aiResponse = getAIResponse(userMessage); // Get the response
        addMessage(aiResponse, "ai");
        playSound();  // Play the sound when the bot responds
      }, 500); // Simulated 500ms delay
    }
  });

  // Send message on pressing Enter
  promptInput.on("keypress", function (e) {
    if (e.which === 13) {
      submitBtn.click();
    }
  });
});
