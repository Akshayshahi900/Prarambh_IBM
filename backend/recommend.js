// recommend.js
const { ChatTogetherAI } = require('@langchain/community/chat_models/togetherai');
const { PromptTemplate } = require('@langchain/core/prompts');
require('dotenv').config();

const model = new ChatTogetherAI({
  apiKey: process.env.TOGETHER_API_KEY,
  modelName: "mistralai/Mixtral-8x7B-Instruct-v0.1",
  temperature: 0.7,
  maxTokens: 800,
});

const prompt = new PromptTemplate({
  inputVariables: ["age", "weight", "height", "goal", "preference"],
  template: `
You are a professional dietitian.

User Details:
- Age: {age}
- Weight: {weight} kg
- Height: {height} cm
- Goal: {goal}
- Dietary Preference: {preference}

Suggest 3 healthy meals for today with:
1. Meal name
2. Approximate calories
3. Macronutrient breakdown (Protein / Carbs / Fats)
4. A short reason why it's suitable for their goal
`,
});

async function getMealPlan(user) {
  const promptText = await prompt.format(user);
  const res = await model.invoke(promptText);
  return res.content;
}

module.exports = { getMealPlan };
