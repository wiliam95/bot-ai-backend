import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint test (cek server jalan atau tidak)
app.get('/', (req, res) => {
  res.json({ 
    status: 'Server backend jalan! ✅',
    timestamp: new Date().toISOString()
  });
});

// Endpoint untuk chat dengan AI
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    // Ambil API key dari environment variable
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ 
        error: 'API key tidak ditemukan' 
      });
    }

    // Panggil Google Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    res.json({ 
      reply: text,
      success: true 
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Terjadi kesalahan',
      details: error.message 
    });
  }
});

// Jalankan server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server backend jalan di port ${PORT}`);
});