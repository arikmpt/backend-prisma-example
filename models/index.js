const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

module.exports = {
    users: prisma.users,
    profiles: prisma.profiles,
    categories: prisma.categories,
    products: prisma.products
}