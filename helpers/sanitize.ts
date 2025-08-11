export function sanitizePlate(plate) {
    const matches = {
        // Ukr: En
        'У': 'Y',
        'К': 'K',
        'Е': 'E',
        'Н': 'H',
        'Х': 'X',
        'В': 'B',
        'А': 'A',
        'Р': 'P',
        'О': 'O',
        'С': 'C',
        'М': 'M',
        'Т': 'T',
        'І': 'I',
        'И': 'I',
    }
    plate = plate.replace(/[\s-]/gi, '').toUpperCase()
    for (const uk in matches) {
        plate = plate.replaceAll(uk, matches[uk]);
    }
    return plate
}

export function sanitizePhone(phone: string): string {
    return phone.replace(/[\(\)\+\s-]/gi, '')
}
