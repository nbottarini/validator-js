import { ValidationsError } from '@nbottarini/validator'

export function expectIsValidationError(e: Error) {
    if (!(e instanceof ValidationsError)) {
        // @ts-ignore
        expect(true).forceFailWithMessage(`Expecting ValidationError to be thrown but '${e}' was thrown`)
    }
}
