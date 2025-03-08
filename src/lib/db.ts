// import { Kysely, PostgresDialect } from 'kysely';
// import { Pool } from 'pg';
// import { todos, users } from '../drizzle/schema';

export interface TodoTable {
	id: string;
	title: string;
	description: string | null;
	completed: boolean;
	created_at: Date;
	updated_at: Date;
	user_id: string;
}

export interface UserTable {
	id: string;
	email: string;
	created_at: Date;
}

export interface Database {
	todos: TodoTable;
	users: UserTable;
}

// Load environment variables
const dbUrl = process.env.SUPABASE_DB_URL;

if (!dbUrl) {
	throw new Error("Missing SUPABASE_DB_URL environment variable");
}

// const dialect = new PostgresDialect({
//   pool: new Pool({
//     connectionString: dbUrl,
//   }),
// });

// export const db = new Kysely<Database>({
//   dialect,
//   log: (event) => {
//     if (event.level === 'query') {
//       console.log(event.query.sql);
//       console.log(event.query.parameters);
//     }
//   },
// });
