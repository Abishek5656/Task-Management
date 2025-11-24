
import { app } from "./app.js";
import { env } from "./config/env.js";
import { log } from "./utils/logger.js";
import { db } from "./config/db.js";

async function startServer() {
  try {
    // Test DB connection
    await db.execute("SELECT NOW();");

    log("Database connected successfully");

    app.listen(env.port, () => {
      log(`Server running on http://localhost:${env.port}`);
    });

  } catch (err) {
    console.error("DB Connection Error:", err);
    process.exit(1);
  }
}

startServer();
