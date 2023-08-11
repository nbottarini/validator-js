import { ValidationsError } from '@nbottarini/validator'

export function expectContainsProperty(validationError: ValidationsError, property: string) {
    if (!validationError.invalidProperties.contains(property)) {
        // @ts-ignore
        expect(true).forceFailWithMessage(`ValidationError was thrown but without property ${property}`)
    }
}
