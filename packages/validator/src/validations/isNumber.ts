export function isNumber(value: any) {
    return !Number.isNaN(parseFloat(value)) &&
        Number.isFinite(parseFloat(value)) &&
        value.toString().countOccurrences('.') <= 1
}

