// index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { getMealPlan } = require('./recommend');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('🚀 Diet Recommendation API is running!');
});

app.post('/api/recommend', async (req, res) => {
  try {
    const user = req.body;
    const mealPlan = await getMealPlan(user);
    res.json({ success: true, mealPlan });
  } catch (error) {
    console.error("Meal generation failed:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
