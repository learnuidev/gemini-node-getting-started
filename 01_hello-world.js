const { GoogleGenerativeAI } = require("@google/generative-ai");
const { parseInput } = require("./utils/parse-input");

// Add your own api key here:
const apiKey = `AIzaSyDU5IZekSX7GJaqOKZEC9u2vbefJMoeHFY`;

const genAI = new GoogleGenerativeAI(apiKey);

// Create a model instance
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const text = `Hello world`;
const prompt = `Convert the following English text to Hanzi with Pinyin:
${text}
Format the output as a stringified JSON format like so:
{
"hanzi": "...",
"pinyin": "..."
}`;

model
  .generateContent(prompt)
  .then((result) => {
    return result.response;
  })
  .then(async (resp) => {
    const text = await resp?.text();

    const parsed = parseInput(text);
    console.log("RESP", JSON.stringify({ ...resp, text, parsed }, null, 4));
  });
