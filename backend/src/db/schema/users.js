import { pgTable, serial, varchar, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name").notNull(),
  email: varchar("email").notNull().unique(),
  password: text("password").notNull(),
  role: varchar("role").default("employee"),
  managerId: serial("manager_id"),
});
