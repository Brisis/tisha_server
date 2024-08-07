import { PrismaClient } from '@prisma/client'
import locations from './locations'
import users from './users'
import * as argon from "argon2"

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

        const hashedPassword = await argon.hash("password")

        await prisma.user.createMany({
            data: users.map((user) =>  ({
                name: user["name"],
                email: user["email"],
                password: hashedPassword,
                farmSize: user["farmSize"],
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
        await prisma.location.deleteMany({})
        await prisma.input.deleteMany({})
        await prisma.user.deleteMany({})

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

