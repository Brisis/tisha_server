import { Role } from "@prisma/client"
const users = [
    {
        name: "Emily Johnson",
        email: "emily.johnson@abccorporation.com",
        role: Role.FARMER,
        password: "abccorporation"
    },
    {
        name: "Michael Williams",
        email: "michael.williams@xyzcorp.com",
        role: Role.FARMER,
        password: "xyzcorp"
    },
    {
        name: "John Smith",
        email: "john.smith@acmeinc.com",
        role: Role.FARMER,
        password: "acmeinc"
    },
    {
        name: "Emma Davis",
        email: "emma.davis@techsolutions.com",
        role: Role.FARMER,
        password: "techsolutions"
    },
    {
        name: "William Brown",
        email: "william.brown@globalmfg.com",
        role: Role.FARMER,
        password: "globalmfg"
    },
    {
        name: "Sophia Lee",
        email: "sophia.lee@fooddelights.com",
        role: Role.FARMER,
        password: "fooddelights"
    },
    {
        name: "James Anderson",
        email: "james.anderson@financialstrategies.com",
        role: Role.FARMER,
        password: "financialstrategies"
    },
    {
        name: "Olivia Martin",
        email: "olivia.martin@ecotechsolutions.com",
        role: Role.FARMER,
        password: "ecotechsolutions"
    },
    {
        name: "Robert Johnson",
        email: "robert.johnson@fashiontrends.com",
        role: Role.FARMER,
        password: "fashiontrends"
    },
]

export default users