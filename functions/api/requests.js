import {sanitizePhone, sanitizePlate} from "./../../helpers/sanitize";

/**
 * Search active request
 * @param context
 * @returns {Promise<Response>}
 */
export async function onRequestGet(context) {
    const {searchParams} = new URL(context.request.url)
    let date = new Date();
    date.setDate(date.getDate() - 7);
    let where = {
        expireAt: {
            gt: date.toISOString(),
        },
    }
    searchParams.forEach((value, name) => {
        if (name === 'plate') {
            where[name] = {contains: sanitizePlate(value)}
        } else if (name === 'phone') {
            where['user'] = {phone: value}
        } else if (name.includes('.')) {
            let names = name.split('.')
            let new_where = {}
            new_where[names[0]] = {}
            new_where[names[0]][names[1]] = value
            where = {...where, ...new_where}
        } else {
            where[name] = value
        }
    })
    const results = await context.env.prisma.request.findMany({
        take: 50,
        where: where,
        orderBy: [{expireAt: 'desc'}],
        include: {
            user: true
        }
    })

    return Response.json(results);
}

/**
 * Add new request
 * @param context
 * @returns {Promise<Response>}
 */
export async function onRequestPost(context) {
    const data = await context.request.json()
    let status = 500;

    let plate = sanitizePlate(data.plate)

    const user = {
        create: {
            building: data.building,
            flat: data.flat
        },
        where: {
            id: 0 // fake ID to insert new if not found
        },
    }
    if (data.phone) {
        user.create.phone = sanitizePhone(data.phone)
        user.where = {
            phone: sanitizePhone(data.phone)
        }
    } else {
        let where = {
            building: data.building,
            flat: data.flat
        }
        const temp_user = await context.env.prisma.user.findFirst({where: where})
        if (temp_user) {
            user.where = {
                id: parseInt(temp_user.id)
            }
        }
    }

    const success = await context.env.prisma.request.create({
        data: {
            plate: plate,
            expireAt: data.expireAt ?? data.date_expire,
            user: {
                connectOrCreate: user
            }
        }
    })

    if (success) {
        status = 200;
    }

    return new Response(null, {status: status});
}

/**
 * Delete record
 * @param context
 * @returns {Promise<Response>}
 */
export async function onRequestDelete(context) {
    const {searchParams} = new URL(context.request.url)
    let status = 500;
    if (searchParams.get('id')) {
        const result = await context.env.prisma.request.delete({
            where: {id: parseInt(searchParams.get('id'))},
        })
        if (result) {
            status = 200;
        }
    }
    return new Response(null, {status: status});
}