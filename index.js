// .env ファイルを読み込む
require('dotenv').config();

// APIキーを取得
const apiKey = process.env.OPENAI_API_KEY;

// APIキーが正しく読み込まれたか確認
console.log(`Your API key is: ${apiKey}`);

// dotenvを読み込む
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

// OpenAIの設定
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// APIリクエストの例
const run = async () => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003", // モデルを選択
      prompt: "Hello, how are you?", // 任意のプロンプトを設定
      max_tokens: 50, // トークンの最大長
    });
    console.log(response.data.choices[0].text); // 応答結果を出力
  } catch (error) {
    console.error("Error with OpenAI API:", error);
  }
};

run();

