const {
  GoogleGenerativeAI,
  DynamicRetrievalMode,
} = require("@google/generative-ai");

// Add your own api key here:
const apiKey = `AIzaSyDU5IZekSX7GJaqOKZEC9u2vbefJMoeHFY`;

const genAI = new GoogleGenerativeAI(apiKey);

// // Create a model instance
const model = genAI.getGenerativeModel(
  {
    model: "models/gemini-1.5-pro-002",
    tools: [
      {
        googleSearchRetrieval: {
          dynamicRetrievalConfig: {
            mode: DynamicRetrievalMode.MODE_DYNAMIC,
            dynamicThreshold: 0.7,
          },
        },
      },
    ],
  },
  { apiVersion: "v1beta" }
);

const prompt =
  "Give me past five results of Liverpool's Champions League fixtures and results";

model
  .generateContent(prompt)
  .then((result) => {
    return result;
  })
  .then(async (resp) => {
    // console.log("resp", resp);
    console.log("RESP", JSON.stringify({ ...resp }, null, 4));
  });
