$(document).ready(function () {
    const chatHistory = $("#chat-history");
    const promptInput = $("#prompt");
    const submitBtn = $("#submit-btn");

    // Función para agregar mensajes al historial de chat
    function addMessage(message, sender) {
        const messageClass = sender === "user" ? "user-message" : "ai-message";
        const messageElement = `<div class="${messageClass}">${message}</div>`;
        chatHistory.append(messageElement);
        chatHistory.scrollTop(chatHistory[0].scrollHeight); // Desplazar al final
    }

    // Función para obtener la respuesta de la IA
    async function getAIResponse(userMessage) {
        try {
            // Verifica si estás en producción o en desarrollo y ajusta la URL
            const baseUrl = window.location.hostname === "xylazbot.xyz" 
                            ? "https://xylazbot.xyz" 
                            : "http://localhost:3000";  // Aquí puedes ajustar la URL según tu entorno

            const response = await fetch(`${baseUrl}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: userMessage }), // Enviar el mensaje al servidor
            });

            if (!response.ok) {
                // Mostrar el código de error y el texto
                throw new Error(`Error en la API del servidor: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            addMessage(data.response, "ai"); // Asegúrate de que 'response' es lo que devuelve tu servidor
        } catch (error) {
            console.error("Error al obtener la respuesta del servidor:", error);
            addMessage("I can't process that right now, mortal.", "ai"); // Mensaje de error
        }
    }

    // Event listener para el botón de enviar
    submitBtn.on("click", function () {
        const userMessage = promptInput.val().trim();

        if (userMessage) {
            addMessage(userMessage, "user"); // Agregar el mensaje del usuario
            promptInput.val(""); // Limpiar el campo de texto

            getAIResponse(userMessage); // Obtener respuesta del bot
        }
    });

    // Event listener para enviar el mensaje al presionar Enter
    promptInput.on("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevenir el comportamiento predeterminado
            submitBtn.click(); // Hacer clic en el botón de enviar
        }
    });
});
