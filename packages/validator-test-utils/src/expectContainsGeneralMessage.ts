import { ValidationsError } from '@nbottarini/validator-errors'

export function expectContainsGeneralMessage(validationError: ValidationsError, message: string) {
    if (!validationError.generalErrorMessages.contains(message)) {
        // @ts-ignore
        expect(true).forceFailWithMessage(`ValidationError was thrown but without general message ${message}. Instead was: ${validationError}`)
    }
}
