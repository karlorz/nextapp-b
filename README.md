# Todo App with Supabase

A modern todo application built with React and Supabase, featuring real-time updates.

## Features

- 🔐 Authentication with Supabase Auth
- 🔄 Real-time todo updates
- 📱 Responsive design with Tailwind CSS
- 🚀 Easy database reset with Supabase CLI

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
pnpm install
```

3. Copy the environment variables:
```bash
cp .env.example .env
```

4. Set up your Supabase project and update the `.env` file with your credentials:
- Create a new project at [Supabase](https://supabase.com)
- Copy the project URL and anon key from your project settings
- Set up GitHub OAuth in your Supabase project settings

5. Reset Database (Optional, but recommended for a clean start):
```bash
pnpm db:reset
```
This command will reset the linked Supabase database using the Supabase CLI.

6. Start the development server:
```bash
pnpm dev
```

## Project Structure

```
├── src/
│   ├── components/       // React components
│   ├── hooks/           // Custom React hooks
│   ├── lib/             // Utility functions and configurations
│   └── types/           // TypeScript type definitions
├── .github/
│   └── workflows/       // GitHub Actions workflows (currently removed)
└── migrations/          // Database migrations (no longer used)
```

## Environment Variables

- `VITE_SUPABASE_PROJECT_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Development

- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm preview`: Preview production build
- `pnpm db:reset`: Reset the Supabase database using Supabase CLI

## Contributing

1. Create a feature branch
2. Make your changes
3. Create a pull request
4. Wait for the CI checks to pass
5. Get your PR reviewed and merged

## License

MIT
