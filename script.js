
require('dotenv').config(); 

$(document).ready(function () {
  
  $('#chat-history').append('<p>Xylaz...</p>');

  
  const apiKey = process.env.OPENAI_API_KEY;

  const { Configuration, OpenAIApi } = require('openai');

// Accede a la clave desde las variables de entorno
const apiKey = process.env.OPENAI_API_KEY;

// Configura la API de OpenAI
const configuration = new Configuration({
  apiKey: apiKey,
});

const openai = new OpenAIApi(configuration);

// Función para interactuar con OpenAI
async function callOpenAI(prompt) {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // o "gpt-4" si tienes acceso
      messages: [{ role: "user", content: prompt }],
      max_tokens: 100,
    });

    console.log("Respuesta de OpenAI:", response.data.choices[0].message.content);
  } catch (error) {
    console.error("Error al llamar a la API de OpenAI:", error.message);
  }
}

// Prueba la función
callOpenAI("hey, how are you");
  async function getAIResponse(prompt) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Bearer ${apiKey},
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
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

  
  $('#send-button').click(async function () {
    const userMessage = $('#user-input').val();
    if (!userMessage) return;

  
    $('#chat-history').append(<p class="user-message">You: ${userMessage}</p>);
    $('#user-input').val(''); 

    
    $('#chat-history').append('<p class="bot-message">Xylaz is typing...</p>');
    const botResponse = await getAIResponse(userMessage);

   
    $('#chat-history p.bot-message').last().text(Xylaz: ${botResponse});
  });

 
  $('#user-input').keypress(function (event) {
    if (event.which === 13) {
      event.preventDefault();
      $('#send-button').click();
    }
  });
});
