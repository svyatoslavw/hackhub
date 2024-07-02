import { faker } from "@faker-js/faker"
import { Category, PrismaClient } from "@prisma/client"
import * as dotenv from "dotenv"

dotenv.config()
const prisma = new PrismaClient()

const createCategories = async (quantity: number) => {
  const categories: Category[] = []

  for (let i = 0; i < quantity; i++) {
    const name = faker.commerce.product()

    const track = await prisma.category.create({
      data: {
        name,
        icon: `/uploads/${i + 1}.png`
      }
    })
    categories.push(track)
  }
  console.log(`Created ${categories.length} categories`)
}

async function main() {
  console.log("Start seeding...")
  await createCategories(10)
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect)
