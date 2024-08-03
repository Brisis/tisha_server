import { PrismaClient } from '@prisma/client'
import locations from './locations'
import users from './users'
const prisma = new PrismaClient()

const create = async () => {
    try {
        await prisma.location.createMany({
            data: locations.map((location) => ({
                name: location["name"],
                city: location["city"]
            })) || [],
            skipDuplicates: true
        })

        await prisma.user.createMany({
            data: users.map((user) => ({
                name: user["name"],
                email: user["email"],
                password: user["password"],
                role: user["role"]
            })) || [] ,
            skipDuplicates: true
        })

        console.log("Seeding Done");

    } catch (error) {
        throw error
    }
}

const destroy = async () => {
    try {
        // await prisma.location.deleteMany({})
        // await prisma.category.deleteMany({})
        // await prisma.user.deleteMany({})
        // await prisma.chat.deleteMany({})
        // await prisma.advert.deleteMany({})
        // await prisma.gallery.deleteMany({})
        // await prisma.adGallery.deleteMany({})

        console.log("Destroy Done");

    } catch (error) {
        throw error
    }
}

destroy()
  .then(async () => {
    await create()
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

