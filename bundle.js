$(document).ready(function () {
    const chatHistory = $("#chat-history");
    const promptInput = $("#prompt");
    const submitBtn = $("#submit-btn");

    // Función para agregar mensajes al historial del chat
    function addMessage(message, sender) {
        const messageClass = sender === "user" ? "user-message" : "ai-message";
        const messageElement = `<div class="${messageClass}">${message}</div>`;
        chatHistory.append(messageElement);
        chatHistory.scrollTop(chatHistory[0].scrollHeight);
    }

    // Función para obtener respuesta de la IA de Google Generative AI
    async function getAIResponse(userMessage) {
        const apiKey = 'AIzaSyCIBVk3B2-hg_ZSjM5RU-r4SA5kfnVgdd8'; // Reemplaza con tu clave de API de Google Generative AI
        const url = '"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCIBVk3B2-hg_ZSjM5RU-r4SA5kfnVgdd8; // En este caso, aquí deberías poner la URL para la API de Google o de tu servidor si usas uno
        const body = JSON.stringify({
            model: "gemini-1.5-flash",  // O el modelo que estés utilizando
            prompt: userMessage,
            maxOutputTokens: 150
        });

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: body
            });
            const data = await response.json();
            addMessage(data.generatedText, "ai");  // Suponiendo que el modelo devuelve "generatedText"
        } catch (error) {
            console.error("Error generating response:", error);
            addMessage("I couldn't understand you, mortal.", "ai");
        }
    }

    // Manejo del envío de mensajes
    submitBtn.on("click", function () {
        const userMessage = promptInput.val().trim();

        if (userMessage) {
            addMessage(userMessage, "user"); // Muestra el mensaje del usuario
            promptInput.val(""); // Limpia el campo de entrada

            // Obtiene la respuesta de la IA
            setTimeout(() => {
                getAIResponse(userMessage);
            }, 500); // Retraso simulado para respuesta de la IA
        }
    });

    // Enviar mensaje al presionar Enter
    promptInput.on("keypress", function (e) {
        if (e.which === 13) {
            submitBtn.click();
        }
    });
});
