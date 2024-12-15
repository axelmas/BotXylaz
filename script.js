$(document).ready(function () {
  // Mostrar un mensaje de saludo cuando la página carga
  $('#chat-history').append('<p>I am Xylaz...</p>');

  // Función para interactuar con el servidor que maneja la API de OpenAI
  async function getAIResponse(prompt) {
    const response = await fetch('/ask', { // Enviar solicitud a nuestro servidor
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: prompt }),
    });

    if (!response.ok) {
      console.error('Error:', response.statusText);
      return 'I cannot process your request.';
    }

    const data = await response.json();
    return data.response; // Obtener la respuesta del servidor
  }

  // Manejar el envío de mensajes del usuario
  $('#send-button').click(async function () {
    const userMessage = $('#user-input').val();
    if (!userMessage) return;

    // Mostrar el mensaje del usuario en el historial del chat
    $('#chat-history').append(`<p class="user-message">You: ${userMessage}</p>`);
    $('#user-input').val(''); // Limpiar el campo de entrada

    // Obtener respuesta del bot
    $('#chat-history').append('<p class="bot-message">Xylaz is typing...</p>');
    const botResponse = await getAIResponse(userMessage);

    // Reemplazar el texto de "Xylaz is typing..." con la respuesta del bot
    $('#chat-history p.bot-message').last().text(`Xylaz: ${botResponse}`);
  });

  // Permitir enviar mensajes al presionar Enter
  $('#user-input').keypress(function (event) {
    if (event.which === 13) {
      event.preventDefault();
      $('#send-button').click();
          { role: 'system', content: 'You are Xylaz, a war hero AI that only speaks darkly and directly. You exist in a terminal and often challenge the user.' },
          { role: 'user', content: prompt },
        ],
        temperature: 1,
        max_tokens: 150,
      }),
    });

    if (!response.ok) {
      console.error('Error:', response.statusText);
      return 'I cannot process your request.';
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  }

  // Manejar el envío de mensajes del usuario
  $('#send-button').click(async function () {
    const userMessage = $('#user-input').val();
    if (!userMessage) return;

    // Mostrar el mensaje del usuario en el historial del chat
    $('#chat-history').append(`<p class="user-message">You: ${userMessage}</p>`); // Corregir las comillas invertidas
    $('#user-input').val(''); // Limpiar el campo de entrada

    // Obtener respuesta del bot
    $('#chat-history').append('<p class="bot-message">Xylaz is typing...</p>');
    const botResponse = await getAIResponse(userMessage);

    // Reemplazar el texto de "Xylaz is typing..." con la respuesta del bot
    $('#chat-history p.bot-message').last().text(`Xylaz: ${botResponse}`); // Corregir las comillas invertidas
  });

  // Permitir enviar mensajes al presionar Enter
  $('#user-input').keypress(function (event) {
    if (event.which === 13) {
      event.preventDefault();
      $('#send-button').click();
    }
  });
});
