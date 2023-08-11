import { ValidationsError } from '@nbottarini/validator'
import { expectContainsProperty } from './expectContainsProperty'
import { expectIsValidationError } from './expectIsValidationError'
import { expectContainsMessage } from './expectContainsMessage'

export async function expectValidationError(func: () => Promise<void>, property: string, message = '') {
    try {
        await func()
    } catch (e) {
        expectIsValidationError(e)
        const validationError = e as ValidationsError
        expectContainsProperty(validationError, property)
        expectContainsMessage(validationError, property, message)
        return
    }
    // @ts-ignore
    expect(true).forceFailWithMessage('Expecting ValidationError to be thrown but nothing was thrown')
}
