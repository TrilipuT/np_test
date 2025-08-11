const list = {
    b1: '67A (1)',
    b2: '67Б (2)',
    b3: '67Г (3)',
    b4: '67В (4)',
    b5: '65A (5)',
    b6: '65Б (6)',
    b7: '65В (7)',
    b8: '65Д (8)',
    b9: '1A (9)',
    b10: '1В (10)',
    b11: '1Г (11)',
    b12: '1Д (12)',
    b13: '65Г (школа)',
}

export function getBuildingName(id) {
    return list[id];
}

export default list