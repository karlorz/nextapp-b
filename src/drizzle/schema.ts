import { pgTable, text, timestamp, serial, boolean, varchar } from 'drizzle-orm/pg-core';

export const todos = pgTable('todos', {
  id: varchar('id', { length: 256 }).primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  completed: boolean('completed').default(false).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
  user_id: varchar('user_id', { length: 256 }).notNull()
});

export const users = pgTable('users', {
  id: varchar('id', { length: 256 }).primaryKey(),
  email: text('email').notNull().unique(),
  created_at: timestamp('created_at').defaultNow().notNull()
});

export type Todo = typeof todos.$inferSelect;
export type NewTodo = typeof todos.$inferInsert;
export type User = typeof users.$inferSelect;
