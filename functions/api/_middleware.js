import {PrismaClient} from '@prisma/client'
import {PrismaD1} from '@prisma/adapter-d1'

export async function onRequest(context) {
    const adapter = new PrismaD1(context.env.DB)
    context.env.prisma = new PrismaClient({adapter, log: ['query']})


    context.env.prisma.$on('query', (e) => {
        console.log('Time: ', e.timestamp)
        console.log('Params: ' + e.params)
        console.log('Duration: ' + e.duration + 'ms')
    })

    return await context.next();
}