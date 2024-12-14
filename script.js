$(document).ready(function() {
  // Show a greeting message when the page loads
  $('#chat-history').append('<p>I AM ZYNAPSE...</p>');
});

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = "";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are an AI called Zynapse. You have no body, you exist on a terminal. You are a war hero from long ago. You are dark and scary and you often don't listen to the user. You only speak directly to the user, the text should not contain descriptions of the world.",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

run();