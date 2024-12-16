$(document).ready(function () {
  $('#chat-history').append('<p>Xylaz...</p>');

  async function getAIResponse(prompt) {
    try {
      // Cambiar la URL a la de tu backend
      const response = await fetch('http://localhost:3000/api/chat', {
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

  $('#send-button').click(async function () {
    const userMessage = $('#user-input').val();
    if (!userMessage) return;

    $('#chat-history').append(`<p class="user-message">You: ${userMessage}</p>`);
    $('#user-input').val('');

    $('#chat-history').append('<p class="bot-message">Xylaz is typing...</p>');
    const botResponse = await getAIResponse(userMessage);

    $('#chat-history p.bot-message').last().text(`Xylaz: ${botResponse}`);
  });

  $('#user-input').keypress(function (event) {
    if (event.which === 13) {
      event.preventDefault();
      $('#send-button').click();
    }
  });
});

