import { pgTable, serial, varchar, text, integer, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),

  name: varchar("name", { length: 150 }).notNull(),
  email: varchar("email", { length: 150 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),

  role: integer("role").notNull(),      // 1 = EMPLOYEE, 2 = MANAGER
  managerId: integer("manager_id"),   

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
