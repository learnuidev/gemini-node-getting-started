const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const { apiKey } = require("./api-key");

const genAI = new GoogleGenerativeAI(apiKey);

// Create a model instance
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const prompt = "Describe whats happening in this picture";
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
    console.log("RESP", JSON.stringify({ ...resp }, null, 4));
  });

const resp = {
  response: {
    candidates: [
      {
        content: {
          parts: [
            {
              text: "Certainly!\n\nThe picture shows an underwater scene featuring a vibrant coral reef ecosystem. At the center, two clownfish, identifiable by their orange and white stripes, are nestled within a large, bushy anemone, their natural habitat. The anemone itself is a brownish-tan color and its many tentacles are quite prominent. \n\nAround the anemone, there are various hard coral structures, with some appearing as flat plates and others having more intricate, branch-like forms. The coral colors range from pinkish to tan, adding to the diversity of the scene. Other smaller fish can be seen swimming near or between the coral formations, including one with a distinct black and yellow color pattern. The water is clear, allowing a good view of the reef's features and the marine life inhabiting it. The lighting suggests a bright, shallow reef environment. Overall, it's a captivating shot of a thriving coral reef community.",
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
        avgLogprobs: -1.0309279897938604,
      },
    ],
    usageMetadata: {
      promptTokenCount: 265,
      candidatesTokenCount: 184,
      totalTokenCount: 449,
    },
    modelVersion: "gemini-2.0-flash-exp",
  },
};
