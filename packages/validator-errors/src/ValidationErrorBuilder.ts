import { ValidationError } from './ValidationError'
import { GeneralValidationError } from './GeneralValidationError'
import { PropertyValidationError } from './PropertyValidationError'
import { ValidationsError } from './ValidationsError'

export class ValidationsErrorBuilder {
    private _errors: ValidationError[] = []

    constructor() {
        this.withGeneralError('Some general error')
        this.withPropertyError('property1', 'Some error')
        this.withPropertyError('property2', 'Some error')
    }

    withGeneralError(message: string): ValidationsErrorBuilder {
        this._errors.push(new GeneralValidationError(message))
        return this
    }

    withPropertyError(property: string, message: string): ValidationsErrorBuilder {
        this._errors.push(new PropertyValidationError(property, message))
        return this
    }

    hasErrors(): boolean {
        return this._errors.length > 0
    }

    build(): ValidationsError {
        return new ValidationsError(this._errors)
    }
}

export function validationsError(): ValidationsErrorBuilder {
    return new ValidationsErrorBuilder()
}
