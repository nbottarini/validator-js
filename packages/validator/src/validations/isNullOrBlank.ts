export function isNullOrBlank(value: any) {
    const strValue = value?.toString().trim()
    return value === undefined || value === null || strValue?.length === 0
}

