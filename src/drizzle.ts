import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { users } from "./schema/books";

const sqlite = new Database("drizzle/sqlite.db");
// const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);

// await migrate(db, { migrationsFolder: "drizzle" });

// const result = await db.select().from(users);

console.log("hi");
