import { PrismaClient } from "@/generated/prisma/client.js"
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg" // The library for postgresql connection, inject it to prisma to query db
import dotenv from "dotenv"

// Load env variables (including DATABASE_URL)
dotenv.config()

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
})
const adapter = new PrismaPg(pool)

export const prisma = new PrismaClient({ adapter })