import { Role } from "@prisma/client"
const users = [
    {
        name: "Tisha Tsokota",
        email: "tisha@gmail.com",
        role: Role.SUPERUSER,
        password: "password"
    },
    {
        name: "John Doe",
        email: "john@gmail.com",
        role: Role.DISTRIBUTOR,
        password: "password"
    },
    {
        name: "Emily Johnson",
        email: "emily@gmail.com",
        role: Role.FARMER,
        password: "abccorporation",
        farmSize: 12,
    },
    {
        name: "Michael Williams",
        email: "michael.williams@xyzcorp.com",
        role: Role.FARMER,
        password: "xyzcorp",
        farmSize: 5,
    }
]

export default users