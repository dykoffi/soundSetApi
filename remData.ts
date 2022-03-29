import prisma from "./src/configs/db";



(async function name() {
    await prisma.sound.deleteMany({})   
})()