import { Gender, Role } from "@prisma/client"
const users = [
    {
        firstname: "Tisha",
        lastname: "Tsokota",
        email: "tisha@gmail.com",
        role: Role.SUPERUSER,
        gender: Gender.FEMALE,
        password: "password"
    }
]

export default users