import { pgTable, serial, varchar, text, integer, timestamp } from "drizzle-orm/pg-core";

export const requests = pgTable("requests", {
  id: serial("id").primaryKey(),

  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),

 createdBy: varchar("created_by", { length: 100 }).notNull(),
 assignedTo: varchar("assigned_to", { length: 100 }).notNull(),

  managerId: integer("manager_id").notNull(),      // B's manager

  status: integer("status").notNull(),         //1- AWAITING_MANAGER, 2- APPROVED, 3- REJECTED,4- IN_PROGRESS, 5-CLOSED
  managerStatus: integer("manager_status").notNull(), // 1-PENDING, 2-APPROVED, 3-REJECTED

  managerComment: text("manager_comment"),
  createdAt: timestamp("created_at").defaultNow(),
});
