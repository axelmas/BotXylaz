<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Xylaz Bot</title>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
  <div class="container">
    <div class="chat-window">
      <div class="chat-header">
        <h2>Xylaz</h2>
      </div>
      <div id="chat-history"></div>
      <div class="chat-input">
        <input type="text" id="user-input" placeholder="Escribe tu mensaje...">
        <button id="submit-btn">Enviar</button>
      </div>
    </div>
  </div>

  <script>
    $(document).ready(function () {
      // Mensaje inicial
      $('#chat-history').append('<p>Xylaz...</p>');

      // Función para obtener la respuesta del backend
      async function getAIResponse(prompt) {
        try {
          // Definir baseUrl con if-else
          let baseUrl;
          if (window.location.hostname === 'xylazbot.xyz') {
            baseUrl = 'https://xylazbot.xyz';
          } else {
            baseUrl = 'http://localhost:3000';
          }

          const response = await fetch(`${baseUrl}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt }),
          });

          if (!response.ok) {
            console.error('Error:', response.statusText);
            return 'Hubo un problema con la solicitud. Inténtalo de nuevo.';
          }

          const data = await response.json();
          return data.response || 'Error en la respuesta del servidor';
        } catch (error) {
          console.error('Error al conectar con el backend:', error);
          return 'Ocurrió un error al procesar tu solicitud.';
        }
      }

      // Función para enviar el mensaje
      async function sendMessage() {
        const userMessage = $('#user-input').val().trim();
        if (!userMessage) return;

        $('#chat-history').append(`<p class="user-message">You: ${userMessage}</p>`);
        $('#user-input').val('');
        $('#chat-history').append('<p class="bot-message">Xylaz is typing...</p>');

        const botResponse = await getAIResponse(userMessage);
        const lastBotMessage = $('#chat-history p.bot-message');
        lastBotMessage.text(`Xylaz: ${botResponse}`);
      }

      // Verificar que los elementos existan antes de añadir los event listeners
      const submitButton = $('#submit-btn');
      const userInput = $('#user-input');

      if (submitButton.length && userInput.length) {
        // Evento de click en el botón de enviar
        submitButton.click(function () {
          sendMessage();
        });

        // Enviar mensaje al presionar Enter
        userInput.keydown(function (event) {
          if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
          }
        });
      } else {
        console.error('El botón de enviar o el campo de entrada no existen en el DOM');
      }
    });
  </script>
</body>
</html>
