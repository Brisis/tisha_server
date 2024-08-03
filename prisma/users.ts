import { Role } from "@prisma/client"
const users = [
    {
        name: "Emily Johnson",
        email: "emily.johnson@abccorporation.com",
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
    },
    {
        name: "John Smith",
        email: "john.smith@acmeinc.com",
        role: Role.FARMER,
        password: "acmeinc",
        farmSize: 82,
    },
    {
        name: "Emma Davis",
        email: "emma.davis@techsolutions.com",
        role: Role.FARMER,
        password: "techsolutions",
        farmSize: 98,
    },
    {
        name: "William Brown",
        email: "william.brown@globalmfg.com",
        role: Role.FARMER,
        password: "globalmfg",
        farmSize: 18,
    },
    {
        name: "Sophia Lee",
        email: "sophia.lee@fooddelights.com",
        role: Role.FARMER,
        password: "fooddelights",
        farmSize: 27,
    },
    {
        name: "James Anderson",
        email: "james.anderson@financialstrategies.com",
        role: Role.FARMER,
        password: "financialstrategies",
        farmSize: 33,
    },
    {
        name: "Olivia Martin",
        email: "olivia.martin@ecotechsolutions.com",
        role: Role.FARMER,
        password: "ecotechsolutions",
        farmSize: 16,
    },
    {
        name: "Robert Johnson",
        email: "robert.johnson@fashiontrends.com",
        role: Role.FARMER,
        password: "fashiontrends",
        farmSize: 3,
    },
]

export default users