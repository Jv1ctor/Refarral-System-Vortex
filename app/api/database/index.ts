import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient({ log: ["error", "query"]})

async function main() {}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })