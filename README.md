<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/16VLAqCuYdtt46AsTTIAeriFqR4Y5TYh_

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev
   # Multi-Provider AI Bot System

Production-ready AI system dengan **unlimited fallback** untuk Telegram/Discord/Web bots.

## 🚀 Quick Start

### 1. Setup Google AI Studio (5 menit)

```bash
# 1. Buka https://aistudio.google.com/
# 2. Get API Key
# 3. PENTING: Enable billing di Google Cloud (gratis, tapi wajib!)
```

### 2. Deploy Scraping Service (10 menit)

```bash
cd ai-system/scraping-service
npm install

# Deploy ke Railway
railway init
railway up
# Copy URL: https://xxx.railway.app
```

### 3. Configure Environment

```bash
# Copy .env.example ke .env
cp ai-system/vercel-bot/.env.example ai-system/vercel-bot/.env

# Edit values:
GOOGLE_API_KEY=your_key_here
SCRAPING_SERVICE_URL=https://your-app.railway.app
```

### 4. Test

```javascript
import { AIService } from './ai-system/vercel-bot/ai-service.js';

const ai = new AIService({
  googleApiKey: process.env.GOOGLE_API_KEY,
  scrapingServiceUrl: process.env.SCRAPING_SERVICE_URL
});

const response = await ai.getResponse('Hello!');
console.log(response.text);
```

---

## 📁 Project Structure

```
ai-system/
├── vercel-bot/           # Deploy ke Vercel
│   ├── ai-service.js     # Main unified service
│   └── providers/
│       ├── gemini-provider.js
│       └── scraper-client.js
│
└── scraping-service/     # Deploy ke Railway/Render
    ├── index.js          # Express server
    ├── Dockerfile
    └── providers/
        ├── brave-scraper.js
        └── copilot-scraper.js
```

---

## 🔄 Fallback Priority

| # | Provider | Limit | Status |
|---|----------|-------|--------|
| 1 | Gemini 2.0 Flash | 1500/day | Primary |
| 2 | Gemini 1.5 Flash | 1000/day | Backup |
| 3 | Gemini 1.5 Pro | 50/day | Quality |
| 4 | Brave Leo | ∞ | Scraping |
| 5 | Copilot | ∞ | Emergency |

---

## 📡 API Endpoints

### Scraping Service

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/stats` | GET | Statistics |
| `/api/chat` | POST | Auto-select provider |
| `/api/chat/brave` | POST | Force Brave |
| `/api/chat/copilot` | POST | Force Copilot |

---

## ⚠️ Important Notes

1. **Enable billing** di Google Cloud untuk kuota Gemini gratis
2. **Copilot** = emergency only (detection risk tinggi)
3. Monitor `/stats` untuk track provider health
4. Quota Gemini reset **midnight Pacific Time**

---

## 🔧 Troubleshooting

### Error 429 (Quota Exceeded)
- Check billing enabled di Google Cloud
- Wait untuk quota reset (midnight PT)
- Gunakan scraping fallback

### Scraping Detection
- Service akan auto-rotate sessions
- Copilot circuit breaker aktif setelah 2 detections
- Reset manual: POST `/api/admin/reset-copilot`

---

## 📊 Monitoring

```javascript
// Get health status
const health = ai.getHealthStatus();
console.log(health);

// Get statistics
const stats = ai.getStats();
console.log(stats);
```

---

## 📄 License

MIT License

