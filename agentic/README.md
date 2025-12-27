## Overview

Multi-platform Video Agent lets you upload a single video and automatically distribute it to YouTube, Instagram Reels, and TikTok with consistent metadata and scheduling. The UI is built with Next.js App Router and Tailwind CSS. An API route orchestrates uploads via official platform APIs.

## Requirements

- Node.js 18+
- OAuth/API credentials for each platform you want to publish to.

Create a `.env.local` file and configure it using `.env.example`:

```bash
cp .env.example .env.local
```

Fill in the following:

- `YOUTUBE_CLIENT_ID`, `YOUTUBE_CLIENT_SECRET`, `YOUTUBE_REFRESH_TOKEN`
- `INSTAGRAM_ACCESS_TOKEN`, `INSTAGRAM_IG_USER_ID`
- `TIKTOK_ACCESS_TOKEN`, `TIKTOK_OPEN_ID`

All secrets should correspond to accounts that have publishing permissions. The refresh and access tokens must remain valid and refreshed per the platform requirements.

## Development

```bash
npm install
npm run dev
```

Visit <http://localhost:3000> to access the dashboard.

## Deployment

Build and run the production bundle:

```bash
npm run build
npm start
```

Deploy to Vercel with the provided CLI command. Ensure all required environment variables are set in the Vercel dashboard before deploying.
