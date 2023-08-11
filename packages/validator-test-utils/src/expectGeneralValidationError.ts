import { ValidationsError } from '@nbottarini/validator'
import { expectIsValidationError } from './expectIsValidationError'
import { expectContainsGeneralMessage } from './expectContainsGeneralMessage'

export async function expectGeneralValidationError(func: () => Promise<void>, message = '') {
    try {
        await func()
    } catch (e) {
        expectIsValidationError(e)
        const validationError = e as ValidationsError
        expectContainsGeneralMessage(validationError, message)
        return
    }
    // @ts-ignore
    expect(true).forceFailWithMessage('Expecting ValidationError to be thrown but nothing was thrown')
}

