import { db } from "../../config/db.js";
import { requests } from "../../db/schema/requests.js";
import { users } from "../../db/schema/users.js";
import { eq } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";


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


        const creator = alias(users, "creator");
        const assignee = alias(users, "assignee");
        const manager = alias(users, "manager");

        const data = await db
            .select({
                id: requests.id,
                title: requests.title,
                description: requests.description,

                createdById: requests.createdBy,
                createdByName: creator.name,

                assignedToId: requests.assignedTo,
                assignedToName: assignee.name,

                managerId: manager.id,
                //managerName: manager.name,

                status: requests.status,
                managerStatus: requests.managerStatus,
                managerComment: requests.managerComment,
                createdAt: requests.createdAt,
            })
            .from(requests)

            // JOIN 1 → createdBy → creator
            .leftJoin(creator, eq(requests.createdBy, creator.id))

            // JOIN 2 → assignedTo → assignee
            .leftJoin(assignee, eq(requests.assignedTo, assignee.managerId))

            // JOIN 3 → assignee.managerId → manager.id
            .leftJoin(manager, eq(assignee.managerId, manager.managerId))

            .where(eq(requests.createdBy, userId));


        console.log("data", data)
        return data;
    },


    // ----  

    async getPendingApprovals(managerId) {
        return await db
            .select()
            .from(requests)
            .where(eq(requests.managerStatus, 1));
    },

    async getRequestById(id) {
        const data = await db
            .select()
            .from(requests)
            .where(eq(requests.id, id));
        return data[0];
    },

    async approve(id, managerComment) {
        return await db.update(requests)
            .set({
                managerStatus: 2,
                status: 2,
                managerComment,
            })
            .where(eq(requests.id, id));
    },

    async reject(id, managerComment) {
        return await db.update(requests)
            .set({
                managerStatus: 3,
                status: 3,
                managerComment,
            })
            .where(eq(requests.id, id));
    }


}