const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = 3000;

// ボディを解析
app.use(bodyParser.json());

// 環境変数からAPIキーを取得
const apiKey = process.env.API_KEY;

// APIエンドポイントを作成
app.post('/api', (req, res) => {
  const clientData = req.body.data;

  // テスト用のレスポンス（APIキーを使う処理はここに記述）
 res.json({
  message: 'APIリクエスト成功',
  receivedData: clientData, // クライアントから送られたデータのみ返す
});

});

// サーバーを起動
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
