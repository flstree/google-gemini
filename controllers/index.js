const { GoogleGenerativeAI } = require("@google/generative-ai");
const { HarmBlockThreshold, HarmCategory } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

// GoogleGenerativeAI required config
const configuration = new GoogleGenerativeAI(process.env.API_KEY);

// const generationConfig = {
//     stopSequences: ["red"],
//     maxOutputTokens: 200,
//     temperature: 0.9,
//     topP: 0.1,
//     topK: 16,
// };

const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
];

// Model initialization
const modelId = "gemini-pro";
const model = configuration.getGenerativeModel({ model: modelId, safetySettings });

/**
 * Generates a response based on the given prompt.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise} - A promise that resolves when the response is sent.
 */
exports.generateResponse = async (req, res) => {
    try {
      const { prompt } = req.body;
  
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      console.log(text);
  
      res.send({ response: text });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
};
