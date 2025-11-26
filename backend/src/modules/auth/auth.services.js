import { db } from "../../config/db.js";
import { users } from "../../db/schema/users.js";
import { eq } from "drizzle-orm";
import { hashPassword, comparePassword } from "../../utils/password.js";
import { generateToken } from "../../utils/jwt.js";

export const authService = {
  // ---------------- SIGN UP ---------------------
  async signup({ fullName, email, password, role, managerId }) {
    // check if email exists
    const exists = await db.select().from(users).where(eq(users.email, email));
    if (exists.length > 0) {
      throw new Error("Email already exists");
    }

    // hash password
    const passwordHash = await hashPassword(password);

    let managerUnique = role === 2 
  ? Math.floor(1000 + Math.random() * 9000) : 0
    // insert user
    const result = await db
      .insert(users)
      .values({
        name: fullName,
        email,
        passwordHash,
        role,
        managerId: managerUnique,
      })
      .returning();

    const user = result[0];

    // generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
      managerid: user.managerId
    });

    return { user, token };
  },

// ---------------- LOGIN ------------------------
  async login(email, password) {
    const rows = await db.select().from(users).where(eq(users.email, email));
    if (rows.length === 0) {
      throw new Error("Invalid email or password");
    }

    const user = rows[0];
    const isValid = await comparePassword(password, user.passwordHash);

    if (!isValid) throw new Error("Invalid email or password");

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return { user, token };
  },
};
