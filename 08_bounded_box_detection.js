const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const { parseInput } = require("./utils/parse-input");
const { apiKey } = require("./api-key");

const genAI = new GoogleGenerativeAI(apiKey);

// Create a model instance
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const prompt = `Return bounding boxes as a JSON array with labels. Never 
return masks or code fencing. Limit to 25 objects. 
If an object is present multiple times, label them according 
to their scientific and popular name.`;
const image = {
  inlineData: {
    data: Buffer.from(fs.readFileSync("fish.png")).toString("base64"),
    mimeType: "image/png",
  },
};

model
  .generateContent([prompt, image], {})
  .then((result) => {
    return result;
  })
  .then(async (resp) => {
    console.log("resp", resp);
    const text = await resp?.response?.text();

    const parsed = parseInput(text);

    console.log("RESP", JSON.stringify({ ...resp, parsed }, null, 4));
  });

const resp = {
  response: {
    candidates: [
      {
        content: {
          parts: [
            {
              text: '```json\n[\n  {"box_2d": [478, 625, 703, 817], "label": "Amphiprion clarkii"},\n  {"box_2d": [243, 494, 468, 744], "label": "Heteractis magnifica"},\n  {"box_2d": [462, 42, 657, 190], "label": "Amphiprion clarkii"},\n  {"box_2d": [346, 0, 462, 101], "label": "Acanthurus lineatus"},\n  {"box_2d": [519, 731, 917, 999], "label": "Heteractis magnifica"}\n]\n```',
            },
          ],
          role: "model",
        },
        finishReason: "STOP",
        safetyRatings: [
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            probability: "NEGLIGIBLE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            probability: "NEGLIGIBLE",
          },
          {
            category: "HARM_CATEGORY_HARASSMENT",
            probability: "NEGLIGIBLE",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            probability: "NEGLIGIBLE",
          },
        ],
        avgLogprobs: -0.6391758388943143,
      },
    ],
    usageMetadata: {
      promptTokenCount: 307,
      candidatesTokenCount: 198,
      totalTokenCount: 505,
    },
    modelVersion: "gemini-2.0-flash-exp",
  },
  parsed: [
    {
      box_2d: [478, 625, 703, 817],
      label: "Amphiprion clarkii",
    },
    {
      box_2d: [243, 494, 468, 744],
      label: "Heteractis magnifica",
    },
    {
      box_2d: [462, 42, 657, 190],
      label: "Amphiprion clarkii",
    },
    {
      box_2d: [346, 0, 462, 101],
      label: "Acanthurus lineatus",
    },
    {
      box_2d: [519, 731, 917, 999],
      label: "Heteractis magnifica",
    },
  ],
};
