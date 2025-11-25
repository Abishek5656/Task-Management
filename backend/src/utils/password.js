import bcrypt from "bcrypt";

// Hash password before saving to database
export async function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

// Compare plain text password with hashed password
export async function comparePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}
