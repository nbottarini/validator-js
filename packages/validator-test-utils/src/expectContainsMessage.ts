import { ValidationsError } from '@nbottarini/validator'

export function expectContainsMessage(validationError: ValidationsError, property: string, message: string) {
    if (message && validationError.propertyErrors[property] !== message) {
        // @ts-ignore
        expect(true).forceFailWithMessage(`ValidationError was thrown but without property message '${message}' instead was '${validationError.propertyErrors[property]}'`)
    }
}
