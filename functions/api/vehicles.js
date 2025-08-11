import {sanitizePhone, sanitizePlate} from "./../../helpers/sanitize";

/**
 * Search vehicle
 * @param context
 * @returns {Promise<Response>}
 */
export async function onRequestGet(context) {
    const {searchParams} = new URL(context.request.url)
    let date = new Date();
    let where = {
        expireAt: {
            gt: date.toISOString(),
        },
    }
    searchParams.forEach((value, name) => {
        if (name === 'plate') {
            where[name] = {contains: sanitizePlate(value)}
        } else if (name === 'phones') {
            where['users'] = {
                some: {
                    phone: value
                }
            }
        } else {
            where[name] = value
        }
    })
    let results
    if (where.count) {
        delete where.count
        results = await context.env.prisma.vehicle.count({
            where: where,
        })
    } else {
        results = await context.env.prisma.vehicle.findMany({
            take: 50,
            orderBy: [{expireAt: 'desc'}],
            where: where,
            include: {
                users: true
            }
        })
    }

    return Response.json(results);
}

/**
 * Add new vehicle
 * @param context
 * @returns {Promise<Response>}
 */
export async function onRequestPost(context) {
    const data = await context.request.json()
    let status = 500;

    let plate = sanitizePlate(data.plate)

    const query = {
        where: {
            plate: plate,
        },
        create: {
            plate: plate,
            expireAt: data.expireAt ?? data.date_expire,
        },
        update: {
            expireAt: data.expireAt ?? data.date_expire,
        },
    }
    const users = {
        connectOrCreate: [
            {
                create: {
                    phone: sanitizePhone(data.phone),
                    building: data.building,
                    flat: data.flat
                },
                where: {
                    phone: sanitizePhone(data.phone)
                },
            }
        ],

    }
    if (data.phone2) {
        users.connectOrCreate.push({
            create: {
                phone: sanitizePhone(data.phone2),
                building: data.building,
                flat: data.flat
            },
            where: {
                phone: sanitizePhone(data.phone2)
            },
        })
    }
    query.create.users = users
    query.update.users = users
    const success = await context.env.prisma.vehicle.upsert(query)

    if (success) {
        status = 200;
    }

    return new Response(null, {status: status});
}

/**
 * Delete vehicle
 *
 * @param context
 * @returns {Promise<Response>}
 */
export async function onRequestDelete(context) {
    const {searchParams} = new URL(context.request.url)
    let status = 500;
    if (searchParams.get('id')) {
        const success = await context.env.prisma.vehicle.delete({
            where: {id: parseInt(searchParams.get('id'))},
        })

        if (success) {
            status = 200;
        }
    }
    return new Response(null, {status: status});
}