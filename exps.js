// server.js

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

// Load .env file
dotenv.config();

const app = express();

// Menyajikan file statis dari folder 'public'
app.use(express.static(path.join(process.cwd(), 'public')));

// Route untuk halaman utama
app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

// Endpoint untuk mendapatkan URL API
app.get('/api/geminiApiUrl', (req, res) => {
    const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`;
    res.json({ geminiApiUrl });
});

// Mengatur port dan memulai server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
