import { db } from "../../config/db.js";
import { requests } from "../../db/schema/requests.js";
import { users } from "../../db/schema/users.js";
import { eq } from "drizzle-orm";



export const requestService = {

    async createRequest(userId, { title, description, assignedTo }) {

        const assignee = await db.select()
            .from(users)
            .where(eq(users.managerId, Number(assignedTo)));   // FIXED

        if (assignee.length === 0) {
            throw new Error("Assigned employee not found");
        }

        //Get the manager of that employee
        const managerId = assignee[0].managerId;
     
        if (!managerId) {
            throw new Error("Assigned employee has no manager");
        }

        //Insert the request
        const result = await db
            .insert(requests)
            .values({
                title,
                description,
                createdBy: userId,
                assignedTo: managerId,
                status: 1,
                managerStatus: 1,
            })
            .returning();

        return result[0];
    },

    // --------------------- GET MY CREATED REQUESTS -------------------------
 async getMyRequests(userId) {

    const data = await db
      .select({
        id: requests.id,
        title: requests.title,
        description: requests.description,
        createdById: requests.createdBy,
        createdByName: users.name,         // creator name
        assignedToId: requests.assignedTo,
        assignedToName: assignedUser.name, // assigned employee name
        managerId: manager.id,
        managerName: manager.name,
        status: requests.status,
        managerStatus: requests.managerStatus,
        managerComment: requests.managerComment,
        createdAt: requests.createdAt,
      })
      .from(requests)
      .leftJoin(users, eq(requests.createdBy, users.id))        // createdBy → users
      .leftJoin(users.as("assignedUser"), eq(requests.createdBy, assignedUser.id)) // assignedTo → users
      .leftJoin(users.as("manager"), eq(assignedUser.managerId, requests.assignedTo)) // manager of assigned user
      .where(eq(requests.createdBy, userId)); // or use managerId depending on role

    return data;
  }


}