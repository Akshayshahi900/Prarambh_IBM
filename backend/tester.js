const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function testRecommendations() {
  const testCases = JSON.parse(fs.readFileSync('./test.json', 'utf8'));
  const results = [];

  for (let i = 0; i < testCases.length; i++) {
    const input = testCases[i];
    console.log(`\n🔍 Test Case #${i + 1}: ${input.user_type.toUpperCase()}`);

    try {
      const response = await axios.post('http://localhost:3000/api/recommend', input);
      const output = response.data;

      // Save each result in an array
      results.push({
        test_case_number: i + 1,
        input,
        output
      });

      // Optional: also log to console
      console.log("✅ Output:", output);
    } catch (err) {
      const errorMessage = err.response?.data || err.message;
      results.push({
        test_case_number: i + 1,
        input,
        error: errorMessage
      });

      console.error(`❌ Error in test case #${i + 1}:`, errorMessage);
    }
  }

  // Save all results to a file
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const outputPath = path.join(__dirname, `./test_outputs/output_${timestamp}.json`);
  fs.mkdirSync('./test_outputs', { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf8');

  console.log(`\n📝 All results saved to: ${outputPath}`);
}

testRecommendations();
