$(document).ready(function () {
  // Mensaje inicial al cargar la página
  $('#chat-history').append('<p>Xylaz...</p>');

  // Función para obtener la respuesta del backend (API)
  async function getAIResponse(prompt) {
    try {
      // Cambiar la URL a la de tu backend
      const response = await fetch('https://xylazbot.xyz/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }), // Enviar solo el prompt al backend
      });

      if (!response.ok) {
        console.error('Error:', response.statusText);
        return 'Hubo un problema con la solicitud. Inténtalo de nuevo.';
      }

      const data = await response.json();
      return data.response; // Devuelve la respuesta del backend
    } catch (error) {
      console.error('Error al conectar con el backend:', error);
      return 'Ocurrió un error al procesar tu solicitud.';
    }
  }

  // Evento de click en el botón de enviar
  $('#send-button').click(async function () {
    const userMessage = $('#user-input').val().trim(); // Trim para eliminar espacios al principio y final
    if (!userMessage) return; // Si no hay mensaje, no hace nada

    $('#chat-history').append(`<p class="user-message">You: ${userMessage}</p>`);
    $('#user-input').val(''); // Limpiar el campo de entrada

    $('#chat-history').append('<p class="bot-message">Xylaz is typing...</p>');
    const botResponse = await getAIResponse(userMessage);

    // Reemplazar el mensaje de "Xylaz is typing..." por la respuesta real
    $('#chat-history p.bot-message').last().text(`Xylaz: ${botResponse}`);
  });

  // Enviar mensaje al presionar Enter
  $('#user-input').keypress(function (event) {
    if (event.which === 13) { // Verifica si la tecla presionada es Enter (13)
      event.preventDefault(); // Evitar que se envíe el formulario (si es que existe uno)
      $('#send-button').click(); // Hacer clic en el botón de enviar
    }
  });
});
