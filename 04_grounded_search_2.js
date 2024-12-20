const { GoogleGenerativeAI } = require("@google/generative-ai");
const { apiKey } = require("./api-key");

const genAI = new GoogleGenerativeAI(apiKey);

// // Create a model instance
const model = genAI.getGenerativeModel(
  {
    model: "gemini-2.0-flash-exp",
    tools: [
      {
        googleSearch: {},
      },
    ],
  },
  { apiVersion: "v1beta" }
);

const prompt =
  "Give me past five results of Liverpool's Champions League fixtures and results.";

model
  .generateContent(prompt)
  .then((result) => {
    return result;
  })
  .then(async (resp) => {
    // console.log("resp", resp);
    console.log("RESP", JSON.stringify({ ...resp }, null, 4));
  });
