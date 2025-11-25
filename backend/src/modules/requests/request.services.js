import { db } from "../../config/db.js";
import { requests } from "../../db/schema/requests.js";
import { users } from "../../db/schema/users.js";
import { eq } from "drizzle-orm";



export const requestService = {

async createRequest(userId, { title, description, assignedTo, name }) {

  const assignee = await db.select()
      .from(users)
      .where(eq(users.managerId, Number(assignedTo)));   // FIXED

  if (assignee.length === 0) {
      throw new Error("Assigned employee not found");
  }

  //Get the manager of that employee
  const managerId = assignee[0].managerId;
  let managername = assignee[0].name
  if (!managerId) {
      throw new Error("Assigned employee has no manager");
  }

  //Insert the request
  const result = await db
      .insert(requests)
      .values({
          title,
          description,
          createdBy: name,
          assignedTo: managername,
          managerId: managerId,
          status: 1,
          managerStatus: 1,
      })
      .returning();

  return result[0];
}



}