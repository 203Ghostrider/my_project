// dotenvを読み込む
require('dotenv').config();

// 環境変数の読み取り
const apiKey = process.env.API_KEY;

// 確認のためAPIキーをコンソールに出力
console.log(`Your API key is: ${apiKey}`);
