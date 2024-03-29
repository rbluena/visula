import { isProduction } from "@/constants";
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (!isProduction) global.prisma = prisma;

export default prisma;
