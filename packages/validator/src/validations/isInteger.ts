export function isInteger(value: any) {
    return !Number.isNaN(parseInt(value, 10)) &&
        Number.isFinite(parseInt(value, 10)) &&
        parseInt(value, 10).toString() == value
}
