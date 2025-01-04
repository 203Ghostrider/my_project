// 必要なパッケージをインポート
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

// Expressアプリケーションのインスタンスを作成
const app = express();
const port = process.env.PORT || 3000;

// ミドルウェアの設定
app.use(cors());
app.use(express.json());

// ルートエンドポイント（動作確認用）
app.get('/', (req, res) => {
  res.send('サーバーが正常に動作しています！');
});

// 夢診断エンドポイント
app.post('/dream-diagnosis', async (req, res) => {
  const { dreamText } = req.body;

  if (!dreamText) {
    return res.status(400).json({ error: "夢の内容を入力してください。" });
  }

  try {
    // OpenAI APIへのリクエスト
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-4-turbo",
        messages: [
          { role: "system", content: "あなたは夢診断の専門家です。" },
          { role: "user", content: `こんな夢を見たのだけど、その夢が意味することはどういうことだろう？「${dreamText}」` }
        ],
        max_tokens: 1000,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // OpenAIからのレスポンスをクライアントに返す
    res.json({ result: response.data.choices[0].message.content.trim() });
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).json({ error: "APIリクエスト中にエラーが発生しました。" });
  }
});

// サーバーを指定のポートで起動
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const path = require('path'); // 既にインポートしていなければ追加

// 静的ファイルの提供設定
app.use(express.static(path.join(__dirname, 'public')));

// その他のリクエストで index.html を返す
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

