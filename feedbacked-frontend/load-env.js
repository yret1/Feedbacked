import dotenv from "dotenv";
import fs from "fs";

const envFile = ".env.local";
if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
}
