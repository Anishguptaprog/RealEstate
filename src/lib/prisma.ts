// import { Prisma } from "@prisma/client";
//import { Prisma } from "@prisma/client/extension";
import { PrismaClient } from "@prisma/client";
 
const gPrisma = global as unknown as {prisma: PrismaClient};

export const prisma = gPrisma.prisma || new PrismaClient()

if(process.env.NODE_ENV !== "production") gPrisma.prisma = prisma;

export default prisma;