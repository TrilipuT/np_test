import {sanitizePhone, sanitizePlate} from "./../../helpers/sanitize";

/**
 * Search vehicle
 * @param context
 * @returns {Promise<Response>}
 */
export async function onRequestGet(context) {
    const {searchParams} = new URL(context.request.url)
    let where = {}
    searchParams.forEach((value, name) => {
        where[name] = value
    })
    const results = await context.env.prisma.user.findMany({where: where})

    return Response.json(results);
}

/**
 * Add new user
 * @param context
 * @returns {Promise<Response>}
 */
export async function onRequestPost(context) {
    const data = await context.request.json()
    let status = 500;

    const success = await context.env.prisma.user.upsert({
        where: {
            phone: '',
            building: data.building,
            flat: data.flat
        },
        create: {
            phone: sanitizePhone(data.phone),
            building: data.building,
            flat: data.flat
        },
        update: {
            phone: sanitizePhone(data.phone),
        },

    })

    if (success) {
        status = 200;
    }

    return new Response(null, {status: status});
}

/**
 * Delete user
 * @param context
 * @returns {Promise<Response>}
 */
export async function onRequestDelete(context) {
    const {searchParams} = new URL(context.request.url)
    let status = 500;
    if (searchParams.get('id')) {
        const result = await context.env.prisma.user.delete({
            where: {id: parseInt(searchParams.get('id'))},
        })
        if (result) {
            status = 200;
        }
    }
    return new Response(null, {status: status});
}