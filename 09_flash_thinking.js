const { GoogleGenerativeAI } = require("@google/generative-ai");
const { apiKey } = require("./api-key");

// Add your own api key here:

const genAI = new GoogleGenerativeAI(apiKey);

// Create a model instance
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-thinking-exp",
});

const prompt = "Explain the Pythagorean theorem to a 10-year-old.";

model.generateContent(prompt).then((result) => {
  console.log(JSON.stringify(result, null, 4));
});

const resp = {
  response: {
    candidates: [
      {
        content: {
          parts: [
            {
              text: 'Here\'s a thinking process that could lead to the explanation of the Pythagorean theorem for a 10-year-old:\n\n1. **Identify the Audience:**  A 10-year-old. This means avoiding complex jargon, using relatable examples, and keeping the explanation concise and engaging.\n\n2. **Core Concept:** The Pythagorean theorem deals with right-angled triangles and the relationship between the lengths of their sides. This is the starting point.\n\n3. **Key Terms:**  Right-angled triangle, hypotenuse, legs (or sides that make the right angle). These need to be explained simply.\n\n4. **Visual Aid (Mental):**  Imagine a right-angled triangle. Think about how squares drawn on each side relate to each other. This is the core visual representation of the theorem.\n\n5. **Simplify the Math:** Avoid algebraic notation (a², b², c²) initially. Focus on the *area* of the squares.\n\n6. **Analogy/Example:** Think of a practical example that a child might grasp. Building blocks or tiles can represent the squares. This helps make the abstract concept concrete.\n\n7. **Structure:**  Start with the basics, introduce the terms, explain the relationship with squares, provide an example, and offer a summary.\n\n8. **Draft 1 (Mental):** "It\'s about triangles with a special corner. If you draw squares on the sides, the two smaller squares fit into the big square."  *Too simplistic and doesn\'t introduce the terms properly.*\n\n9. **Draft 2 (Mental):** "There\'s a rule for right triangles. The long side squared is equal to the sum of the other two sides squared." *Introducing squaring might be confusing without explaining it visually.*\n\n10. **Refinement - Introduce Terminology:** Start by defining a right-angled triangle and its parts. This sets the stage for the theorem.\n\n11. **Refinement - Visual Explanation with Squares:**  Explain the concept of drawing squares on each side. Emphasize the *area* of these squares.\n\n12. **Refinement -  Connect the Squares:**  Explain the core relationship: the area of the square on the long side is equal to the combined areas of the squares on the other two sides.\n\n13. **Refinement - Use Simpler Language:**  Instead of "sum of the areas," use "add up the areas."  Instead of "equal to," use "the same as."\n\n14. **Refinement -  Concrete Example:**  Use numbers to illustrate the concept. A 3-4-5 triangle is a classic example and easy to work with.\n\n15. **Refinement - Summarize and Explain the "Why":**  Reiterate the rule and explain why it\'s useful (finding missing sides).\n\n16. **Refinement -  Encourage Further Exploration:**  Suggest drawing and testing, which reinforces the learning.\n\n17. **Final Polish:** Read through the explanation to ensure clarity, conciseness, and age-appropriateness. Make sure the tone is encouraging and not intimidating. Add a concluding remark to reinforce the idea that it\'s a cool and useful rule.',
            },
            {
              text: "Imagine you have a special kind of triangle called a **right-angled triangle**. It's special because one of its corners is a perfect square corner, like the corner of a book or a window. We call that a **right angle**.\n\nThis triangle has three sides. The two sides that make up that right angle are called the **shorter sides**. Let's call them Side A and Side B.\n\nThe third side, which is across from the right angle and is the longest side, is called the **hypotenuse**. Let's call it Side C.\n\nNow, here's the cool part that a really smart guy named Pythagoras figured out:\n\n**If you build a square on each side of the right-angled triangle, something amazing happens!**\n\nImagine you draw a square where each side of the square is the same length as Side A. Let's say Side A is 3 blocks long. You'd build a 3x3 square with 9 blocks inside.\n\nThen, you do the same for Side B. Let's say Side B is 4 blocks long. You'd build a 4x4 square with 16 blocks inside.\n\nFinally, you do it for the longest side, Side C (the hypotenuse). Let's say Side C is 5 blocks long. You'd build a 5x5 square with 25 blocks inside.\n\n**Pythagoras noticed that the number of blocks in the square built on Side C is exactly the same as the number of blocks in the squares built on Side A and Side B *put together*!**\n\nSo, in our example:\n\n* Square on Side A: 3 x 3 = 9 blocks\n* Square on Side B: 4 x 4 = 16 blocks\n* Square on Side C: 5 x 5 = 25 blocks\n\nAnd guess what? 9 + 16 = 25!\n\n**That's the Pythagorean theorem!**  It says that in a right-angled triangle:\n\n**The area of the square on the longest side (hypotenuse) is equal to the sum of the areas of the squares on the other two sides.**\n\nWe can write it in a short way using letters:\n\n**A² + B² = C²**\n\nWhere:\n\n* A² means the area of the square on Side A.\n* B² means the area of the square on Side B.\n* C² means the area of the square on Side C (the hypotenuse).\n\n**Why is this useful?**\n\nIf you know the lengths of two sides of a right-angled triangle, you can use the Pythagorean theorem to figure out the length of the missing third side!  It's like a secret code for right-angled triangles!\n\nSo, next time you see a right-angled triangle, remember the squares and how they fit together! That's the magic of the Pythagorean theorem!\n",
            },
          ],
          role: "model",
        },
        finishReason: "STOP",
        index: 0,
        safetyRatings: [
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            probability: "NEGLIGIBLE",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            probability: "NEGLIGIBLE",
          },
          {
            category: "HARM_CATEGORY_HARASSMENT",
            probability: "NEGLIGIBLE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            probability: "NEGLIGIBLE",
          },
        ],
      },
    ],
    usageMetadata: {
      promptTokenCount: 15,
      candidatesTokenCount: 1306,
      totalTokenCount: 1321,
    },
    modelVersion: "gemini-2.0-flash-thinking-exp",
  },
};
