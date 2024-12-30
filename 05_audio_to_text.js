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
Extract text from this audio. Please include start and end timestamps

Format the output as a stringified JSON format like so:
{
"text": "...",
"start": "..",
"end": ".."
}
`;

const audioName = `13_01.m4a`;
const audioMetadata = {
  inlineData: {
    data: Buffer.from(fs.readFileSync(audioName)).toString("base64"),
    mimeType: mime.lookup(audioName),
  },
};

model
  .generateContent([prompt, audioMetadata], {})
  .then((result) => {
    return result;
  })
  .then(async (resp) => {
    console.log("resp", resp);
    const text = await resp?.response?.text();

    const parsed = parseInput(text);
    // const parsed = {};

    const jsonResp = JSON.stringify({ ...resp, parsed }, null, 4);

    fs.writeFileSync(`./${audioName}_${Date.now()}.json`, jsonResp);

    console.log("RESP", jsonResp);
  });

const resp1 = {
  response: {
    candidates: [
      {
        content: {
          parts: [
            {
              text: "忙碌的一天。 我去理髮店，我剪頭髮。 我去郵局，我寄信。 我去消防站， 我學習安全手冊。 我去圖書館。 我借書。 我去麵包店，我買麵包。 我去超市， 我買吃的東西。 我去寵物店， 我買狗糧。 哇，忙碌的一天。 Little Fox.",
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
        avgLogprobs: -0.147826689708082,
      },
    ],
    usageMetadata: {
      promptTokenCount: 2523,
      candidatesTokenCount: 79,
      totalTokenCount: 2602,
    },
    modelVersion: "gemini-2.0-flash-exp",
  },
};

const resp2 = {
  response: {
    candidates: [
      {
        content: {
          parts: [
            {
              text: '```json\n{\n"hanzi": "忙碌的一天我去理发店，我剪头发，我去邮局，我寄信。我去消防站，我学习安全守则。我去图书馆，我借书。我去面包店，我买面包。我去超市，我买吃的东西。我去宠物店，我买狗粮。哇，忙碌的一天。",\n"pinyin": "máng lù de yī tiān wǒ qù lǐ fà diàn ，wǒ jiǎn tóu fà ，wǒ qù yóu jú ，wǒ jì xìn 。wǒ qù xiāo fáng zhàn ，wǒ xué xí ān quán shǒu zé 。wǒ qù tú shū guǎn ，wǒ jiè shū 。wǒ qù miàn bāo diàn ，wǒ mǎi miàn bāo 。wǒ qù chāo shì ，wǒ mǎi chī de dōng xī 。wǒ qù chǒng wù diàn ，wǒ mǎi gǒu liáng 。wa ，máng lù de yī tiān 。"\n}\n```',
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
        avgLogprobs: -0.05236264982112187,
      },
    ],
    usageMetadata: {
      promptTokenCount: 2567,
      candidatesTokenCount: 257,
      totalTokenCount: 2824,
    },
    modelVersion: "gemini-2.0-flash-exp",
  },
  parsed: {
    hanzi:
      "忙碌的一天我去理发店，我剪头发，我去邮局，我寄信。我去消防站，我学习安全守则。我去图书馆，我借书。我去面包店，我买面包。我去超市，我买吃的东西。我去宠物店，我买狗粮。哇，忙碌的一天。",
    pinyin:
      "máng lù de yī tiān wǒ qù lǐ fà diàn ，wǒ jiǎn tóu fà ，wǒ qù yóu jú ，wǒ jì xìn 。wǒ qù xiāo fáng zhàn ，wǒ xué xí ān quán shǒu zé 。wǒ qù tú shū guǎn ，wǒ jiè shū 。wǒ qù miàn bāo diàn ，wǒ mǎi miàn bāo 。wǒ qù chāo shì ，wǒ mǎi chī de dōng xī 。wǒ qù chǒng wù diàn ，wǒ mǎi gǒu liáng 。wa ，máng lù de yī tiān 。",
  },
};

const resp3 = {
  response: {
    candidates: [
      {
        content: {
          parts: [
            {
              text: '```json\n[\n    {\n        "hanzi": "忙碌的一天",\n        "pinyin": "máng lù de yī tiān",\n        "start": "0.239",\n        "end": "1.399"\n    },\n   {\n        "hanzi": "我去理发店，我剪头发",\n        "pinyin": "wǒ qù lǐ fà diàn, wǒ jiǎn tóu fǎ",\n        "start": "3.319",\n        "end": "7.219"\n    },\n    {\n        "hanzi": "我去邮局，我寄信。",\n        "pinyin": "wǒ qù yóu jú, wǒ jì xìn.",\n         "start": "8.699",\n        "end": "12.379"\n    },\n    {\n       "hanzi": "我去消防站，我学习安全守则。",\n       "pinyin": "wǒ qù xiāo fáng zhàn, wǒ xué xí ān quán shǒu zé.",\n       "start": "14.339",\n       "end": "20.829"\n   },\n     {\n       "hanzi": "我去图书馆。",\n        "pinyin": "wǒ qù tú shū guǎn.",\n        "start": "23.189",\n        "end": "24.559"\n    },\n     {\n       "hanzi": "我借书。",\n        "pinyin": "wǒ jiè shū.",\n         "start": "25.469",\n        "end": "27.289"\n    },\n   {\n       "hanzi": "我去面包店，我买面包。",\n       "pinyin": "wǒ qù miàn bāo diàn, wǒ mǎi miàn bāo.",\n        "start": "29.159",\n        "end": "34.389"\n    },\n     {\n       "hanzi": "我去超市，我买吃的东西。",\n       "pinyin": "wǒ qù chāo shì, wǒ mǎi chī de dōng xī.",\n        "start": "35.869",\n        "end": "40.569"\n    },\n     {\n        "hanzi": "我去宠物店，我买狗粮。",\n         "pinyin": "wǒ qù chǒng wù diàn, wǒ mǎi gǒu liáng.",\n        "start": "42.819",\n        "end": "47.929"\n    },\n     {\n        "hanzi": "哇，忙碌的一天。",\n         "pinyin": "wa, máng lù de yī tiān.",\n         "start": "49.069",\n         "end": "53.239"\n     },\n    {\n        "hanzi": "Little Fox.",\n        "pinyin": "Little Fox.",\n        "start": "55.919",\n        "end": "57.059"\n    }\n]\n```',
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
        avgLogprobs: -0.2576786859057715,
      },
    ],
    usageMetadata: {
      promptTokenCount: 2586,
      candidatesTokenCount: 751,
      totalTokenCount: 3337,
    },
    modelVersion: "gemini-2.0-flash-exp",
  },
  parsed: [
    {
      hanzi: "忙碌的一天",
      pinyin: "máng lù de yī tiān",
      start: "0.239",
      end: "1.399",
    },
    {
      hanzi: "我去理发店，我剪头发",
      pinyin: "wǒ qù lǐ fà diàn, wǒ jiǎn tóu fǎ",
      start: "3.319",
      end: "7.219",
    },
    {
      hanzi: "我去邮局，我寄信。",
      pinyin: "wǒ qù yóu jú, wǒ jì xìn.",
      start: "8.699",
      end: "12.379",
    },
    {
      hanzi: "我去消防站，我学习安全守则。",
      pinyin: "wǒ qù xiāo fáng zhàn, wǒ xué xí ān quán shǒu zé.",
      start: "14.339",
      end: "20.829",
    },
    {
      hanzi: "我去图书馆。",
      pinyin: "wǒ qù tú shū guǎn.",
      start: "23.189",
      end: "24.559",
    },
    {
      hanzi: "我借书。",
      pinyin: "wǒ jiè shū.",
      start: "25.469",
      end: "27.289",
    },
    {
      hanzi: "我去面包店，我买面包。",
      pinyin: "wǒ qù miàn bāo diàn, wǒ mǎi miàn bāo.",
      start: "29.159",
      end: "34.389",
    },
    {
      hanzi: "我去超市，我买吃的东西。",
      pinyin: "wǒ qù chāo shì, wǒ mǎi chī de dōng xī.",
      start: "35.869",
      end: "40.569",
    },
    {
      hanzi: "我去宠物店，我买狗粮。",
      pinyin: "wǒ qù chǒng wù diàn, wǒ mǎi gǒu liáng.",
      start: "42.819",
      end: "47.929",
    },
    {
      hanzi: "哇，忙碌的一天。",
      pinyin: "wa, máng lù de yī tiān.",
      start: "49.069",
      end: "53.239",
    },
    {
      hanzi: "Little Fox.",
      pinyin: "Little Fox.",
      start: "55.919",
      end: "57.059",
    },
  ],
};
