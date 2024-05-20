export function isNumber(value: any) {
    return !Number.isNaN(parseFloat(value)) &&
        Number.isFinite(parseFloat(value)) &&
        parseFloat(value).toString(10) === value.toString() &&
        value.toString().countOccurrences('.') <= 1
}

