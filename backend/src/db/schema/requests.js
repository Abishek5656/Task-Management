import { pgTable, serial, varchar, text, integer, timestamp } from "drizzle-orm/pg-core";

export const requests = pgTable("requests", {
  id: serial("id").primaryKey(),

  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),

  createdBy: integer("created_by").notNull(),  // employee who created
  assignedTo: integer("assigned_to").notNull(), 
  
  status: integer("status").notNull(),          // 1=AWAITING_MANAGER, 2=APPROVED, 3=REJECTED, ...
  managerStatus: integer("manager_status").notNull(), // 1=PENDING,2=APPROVED,3=REJECTED

  managerComment: text("manager_comment"),
  createdAt: timestamp("created_at").defaultNow(),
});
