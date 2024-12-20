const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const mime = require("mime-types");
const { parseInput } = require("./utils/parse-input");
const { apiKey } = require("./api-key");

const genAI = new GoogleGenerativeAI(apiKey);

// Create a model instance
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const prompt = `
Extract text from this audio. Please also convert the extract text into english and pinyin. Please include start and end timestamps.

Format the output as a stringified JSON format like so:
{
"hanzi": "...",
"en: "..",
"pinyin": "...",
"start": "..",
"end": ".."
}
`;

const audioUrl = `https://nomadmethod-api-dev-assetsbucket-2u2iqsv5nizc.s3.us-east-1.amazonaws.com/learnuidev@gmail.com/01JFFR0VG0RESC1M203D31D6H7.mp3`;

console.log("mime.lookup(audioUrl)", mime.lookup(audioUrl));

fetch(audioUrl).then(async (response) => {
  const arrayBuffer = await response.arrayBuffer();

  const audioMetadata = {
    inlineData: {
      data: Buffer.from(arrayBuffer).toString("base64"),
      mimeType: mime.lookup(audioUrl),
    },
  };

  return model
    .generateContent([prompt, audioMetadata], {})
    .then((result) => {
      return result;
    })
    .then(async (resp) => {
      console.log("resp", resp);
      const text = await resp?.response?.text();

      const parsed = parseInput(text);
      // const parsed = {};

      console.log("RESP", JSON.stringify({ ...resp, parsed }, null, 4));
    });
});

const resp = {
  response: {
    candidates: [
      {
        content: {
          parts: [
            {
              text: '```json\n[\n    {\n        "hanzi": "忙碌的一天",\n        "pinyin": "máng lù de yì tiān",\n        "start": "0.243",\n        "end": "1.323"\n    },\n  {\n        "hanzi": "我去理发店，我剪头发。",\n        "pinyin": "wǒ qù lǐ fà diàn, wǒ jiǎn tóu fà.",\n        "start": "2.563",\n        "end": "5.693"\n    },\n    {\n        "hanzi": "我去邮局，我寄信。",\n        "pinyin": "wǒ qù yóu jú, wǒ jì xìn.",\n         "start": "8.253",\n        "end": "12.103"\n    },\n  {\n        "hanzi": "我去消防站，我学习安全守则。",\n        "pinyin": "wǒ qù xiāo fáng zhàn, wǒ xué xí ān quán shǒu zé.",\n        "start": "13.373",\n        "end":"18.603"\n    },\n  {\n        "hanzi": "我去图书馆，",\n        "pinyin": "wǒ qù tú shū guǎn,",\n         "start": "21.093",\n        "end": "23.373"\n    },\n  {\n        "hanzi":"我借书。",\n        "pinyin":"wǒ jiè shū.",\n        "start":"24.083",\n        "end":"25.873"\n  },\n {\n        "hanzi": "我去面包店，我买面包。",\n        "pinyin":"wǒ qù miàn bāo diàn, wǒ mǎi miàn bāo.",\n        "start":"26.963",\n        "end":"31.883"\n    },\n  {\n        "hanzi":"我去超市，我买吃的东西。",\n        "pinyin":"wǒ qù chāo shì, wǒ mǎi chī de dōng xi.",\n        "start":"33.173",\n        "end":"37.353"\n    },\n{\n        "hanzi": "我去宠物店，我买狗粮。",\n        "pinyin":"wǒ qù chǒng wù diàn, wǒ mǎi gǒu liáng.",\n        "start":"38.973",\n        "end":"44.373"\n  },\n   {\n        "hanzi": "哇，忙碌的一天。",\n        "pinyin":"wa, máng lù de yì tiān.",\n         "start":"45.653",\n        "end":"48.703"\n    }\n]\n```',
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
        avgLogprobs: -0.24844551367331325,
      },
    ],
    usageMetadata: {
      promptTokenCount: 2586,
      candidatesTokenCount: 679,
      totalTokenCount: 3265,
    },
    modelVersion: "gemini-2.0-flash-exp",
  },
  parsed: [
    {
      hanzi: "忙碌的一天",
      pinyin: "máng lù de yì tiān",
      start: "0.243",
      end: "1.323",
    },
    {
      hanzi: "我去理发店，我剪头发。",
      pinyin: "wǒ qù lǐ fà diàn, wǒ jiǎn tóu fà.",
      start: "2.563",
      end: "5.693",
    },
    {
      hanzi: "我去邮局，我寄信。",
      pinyin: "wǒ qù yóu jú, wǒ jì xìn.",
      start: "8.253",
      end: "12.103",
    },
    {
      hanzi: "我去消防站，我学习安全守则。",
      pinyin: "wǒ qù xiāo fáng zhàn, wǒ xué xí ān quán shǒu zé.",
      start: "13.373",
      end: "18.603",
    },
    {
      hanzi: "我去图书馆，",
      pinyin: "wǒ qù tú shū guǎn,",
      start: "21.093",
      end: "23.373",
    },
    {
      hanzi: "我借书。",
      pinyin: "wǒ jiè shū.",
      start: "24.083",
      end: "25.873",
    },
    {
      hanzi: "我去面包店，我买面包。",
      pinyin: "wǒ qù miàn bāo diàn, wǒ mǎi miàn bāo.",
      start: "26.963",
      end: "31.883",
    },
    {
      hanzi: "我去超市，我买吃的东西。",
      pinyin: "wǒ qù chāo shì, wǒ mǎi chī de dōng xi.",
      start: "33.173",
      end: "37.353",
    },
    {
      hanzi: "我去宠物店，我买狗粮。",
      pinyin: "wǒ qù chǒng wù diàn, wǒ mǎi gǒu liáng.",
      start: "38.973",
      end: "44.373",
    },
    {
      hanzi: "哇，忙碌的一天。",
      pinyin: "wa, máng lù de yì tiān.",
      start: "45.653",
      end: "48.703",
    },
  ],
};
