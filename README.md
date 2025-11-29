# Quran Memorization App

A comprehensive web and mobile application for memorizing the Quran with spaced repetition, audio playback, recording comparison, and progress tracking.

## Features

- 🔐 **Authentication**: Email/password + Google OAuth
- 🎧 **Top 5 Reciters**: Mishary Alafasy, Al-Sudais, Al-Shuraim, Al-Ghamdi, Al-Muaiqly
- 🎵 **Advanced Audio Player**: Variable speed, A-B repeat, loop modes
- 🎤 **Recording & Comparison**: Record your recitation and compare with reciters
- 📊 **Spaced Repetition**: Smart review scheduling based on mastery
- 📈 **Progress Tracking**: Detailed statistics and exportable reports
- 🌐 **Offline Mode**: Cache surahs for offline practice
- 🌍 **Multi-language**: Arabic, English, Urdu support
- ♿ **Accessible**: RTL layout, screen reader support, keyboard navigation

## Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components

### Backend
- Node.js + Express
- PostgreSQL
- Redis (caching)
- AWS S3 (audio storage)

### Mobile
- React Native + Expo

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis 7+
- AWS account (for S3)

### Installation

```bash
# Clone repository
git clone <repo-url>
cd quran-memorization-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run database migrations
npm run db:migrate

# Seed database with sample data
npm run db:seed

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the app.

## Project Structure

```
quran-memorization-app/
├── frontend/           # Next.js web application
│   ├── app/           # App Router pages
│   ├── components/    # React components
│   ├── lib/           # Utilities and helpers
│   └── hooks/         # Custom React hooks
├── backend/           # Node.js API server
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   └── migrations/    # Database migrations
├── mobile/            # React Native app
└── docs/              # Documentation
```

## Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/quran_app

# Redis
REDIS_URL=redis://localhost:6379

# AWS S3
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_S3_BUCKET=quran-audio-files

# Auth
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# App
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## API Documentation

See [API Documentation](./docs/api.md) for detailed endpoint specifications.

## Audio Licensing

⚠️ **Important**: This repository does not include copyrighted Quran recitation audio files. You must:

1. Obtain proper licenses for reciter audio files
2. Use official sources (e.g., mosque websites, licensed platforms)
3. Replace placeholder audio URLs with your licensed files
4. Comply with Islamic etiquette for Quran display and playback

Recommended sources:
- [EveryAyah.com](http://everyayah.com/) (Public domain)
- Official mosque websites
- Licensed Islamic content platforms

## Deployment

### Frontend (Vercel)
```bash
vercel --prod
```

### Backend (Railway/Render)
```bash
# Configure in dashboard
# Set environment variables
# Deploy from GitHub
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Security

- All passwords are hashed with bcrypt
- JWT tokens for authentication
- Rate limiting on all endpoints
- Input validation and sanitization
- HTTPS enforced in production
- Regular security audits

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Quran text from [Tanzil.net](http://tanzil.net/)
- Translations from various sources
- Islamic scholars for guidance on proper Quran display

## Support

For issues and questions, please open a GitHub issue or contact support@example.com.

---

**Note**: This is a tool to aid in Quran memorization. Always verify your memorization with a qualified teacher.
