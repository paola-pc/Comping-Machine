import { PrismaClient } from '@prisma/client';

// 'trick' for next.js hot-reloading
const client = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;

export default client;