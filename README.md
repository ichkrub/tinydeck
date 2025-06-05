# TinyDeck.me

A web-based utility that allows users to compress large PDF presentations into smaller, shareable files while preserving image clarity and text readability.

## Features

- Drag-and-drop PDF upload
- File size limit: 25MB
- Fast compression with quality preservation
- Rate limiting (3 compressions per IP per day)
- Download compressed files immediately

## Prerequisites

- Node.js 18+ and npm
- GhostScript installed on your system:
  - macOS: `brew install ghostscript`
  - Ubuntu/Debian: `apt-get install ghostscript`
  - Windows: Download from [GhostScript website](https://www.ghostscript.com/releases/gsdnld.html)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Update the Upstash Redis credentials in `.env.local`

3. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- TailwindCSS
- Upstash Redis (for rate limiting)
- GhostScript (for PDF compression)

## Deployment

You can deploy this application on any platform that supports Next.js applications. Make sure to:

1. Install GhostScript on your deployment environment
2. Set up the required environment variables:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

## License

MIT
