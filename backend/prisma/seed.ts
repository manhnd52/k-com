import { prisma } from "../app/config/prisma.js";

async function main() {
  console.log("Seed file is intentionally empty. Data is managed directly in the database.");
  console.log("To reset the database, use Prisma migrations or a manual SQL script.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
