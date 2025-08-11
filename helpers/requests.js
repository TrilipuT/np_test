export async function getVehicle(data) {
    const where = new URLSearchParams(data).toString()
    return await request('/api/vehicles?' + where).then(response => response.json())
}

export async function getRequest(plate) {
    return await request('/api/requests?plate=' + plate).then(response => response.json())
}

export async function getUser(data) {
    const where = new URLSearchParams(data).toString()
    return await request('/api/users?' + where).then(response => response.json())
}

export async function updateVehicle(data) {
    return await request('/api/vehicles', {
        method: 'POST',
        body: JSON.stringify(data)
    })
}

export async function updateRequest(data) {
    return await request('/api/requests', {
        method: 'POST',
        body: JSON.stringify(data)
    })
}

export async function request(path, data) {
    const requestData = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
        ...data
    };
    return await fetch(path, requestData)
}