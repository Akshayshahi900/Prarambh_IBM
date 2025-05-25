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


const Sample_user1 = {
  user_type: "pregnant_woman",
  age: "27",
  weight: "58",
  height: "160",
  location: "Bahraich, Uttar Pradesh",
  diet_type: "Vegetarian",
  monthly_income: "6000",
  food_availability: "rice, wheat, dal, banana, milk, green vegetables",
  known_health_issues: "mild anemia"
};


// Updated Prompt Template for Pregnant Women / Children
const prompt = new PromptTemplate({
  inputVariables: [
    "user_type",
    "age",
    "weight",
    "height",
    "location",
    "diet_type",
    "monthly_income",
    "food_availability",
    "known_health_issues"
  ],
  template: `
You are a nutrition expert helping families in rural Uttar Pradesh. Give locally appropriate advice for health and nutrition.

Target Group: {user_type}
Location: {location}
Age: {age}
Weight: {weight} kg
Height: {height} cm
Diet Preference: {diet_type}
Monthly Income: ₹{monthly_income}
Available Food Items: {food_availability}
Known Health Conditions: {known_health_issues}

Your task:
1. Suggest 3 simple, healthy meals for the day using local, affordable foods.
2. For each meal:
   - Name of meal
   - Approximate calories
   - Protein / Carbs / Fats breakdown
   - Why it's suitable for {user_type}
3. Give 2 additional care or health tips based on their condition.
4. Use simple language, under 150 words.
5. Be culturally sensitive and suggest substitutes if needed.
6. Format response in easy-to-read bullet points.
`,
});

async function getMealPlan(user) {
  const promptText = await prompt.format(user);
  const res = await model.invoke(promptText);
  return res.content;
}

module.exports = { getMealPlan };
