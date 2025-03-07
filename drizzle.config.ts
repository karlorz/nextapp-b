import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';

config({ path: '.env' });

if (!process.env.SUPABASE_DB_URL) {
  throw new Error('SUPABASE_DB_URL is not defined in .env');
}

export default defineConfig({
  schema: './src/drizzle/schema.ts',
  out: './supabase/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.SUPABASE_DB_URL!,
  },
});
