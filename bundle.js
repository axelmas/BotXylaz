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

    // Función para obtener respuesta de la IA desde el servidor
    async function getAIResponse(userMessage) {
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: userMessage }),
            });

            if (!response.ok) {
                throw new Error("Error en la API del servidor");
            }

            const data = await response.json();
            addMessage(data.response, "ai");
        } catch (error) {
            console.error("Error al obtener la respuesta del servidor:", error);
            addMessage("No puedo responderte en este momento, mortal.", "ai");
        }
    }

    // Manejo del envío de mensajes
    submitBtn.on("click", function () {
        const userMessage = promptInput.val().trim();

        if (userMessage) {
            addMessage(userMessage, "user"); // Muestra el mensaje del usuario
            promptInput.val(""); // Limpia el campo de entrada

            // Obtiene la respuesta del servidor
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
