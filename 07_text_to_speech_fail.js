const { GoogleGenerativeAI } = require("@google/generative-ai");

// Add your own api key here:
const apiKey = `AIzaSyDU5IZekSX7GJaqOKZEC9u2vbefJMoeHFY`;

const genAI = new GoogleGenerativeAI(apiKey);

// Create a model instance
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const text = `Hello world`;
const prompt = `Convert the following text to speech: ${text}`;

model
  .generateContent(prompt)
  .then((result) => {
    return result.response;
  })
  .then(async (resp) => {
    const text = await resp?.text();

    console.log("RESP", JSON.stringify({ ...resp, text }, null, 4));
  });