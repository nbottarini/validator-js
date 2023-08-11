import { ValidationError } from './ValidationError'
import { PropertyValidationError } from './PropertyValidationError'
import { GeneralValidationError } from './GeneralValidationError'
import { CustomError } from 'ts-custom-error'

export class ValidationsError extends CustomError {
    private readonly _errors: ValidationError[]

    constructor(errors: ValidationError[]) {
        super(errors.map((error) => error.message).join(', '))
        this._errors = errors
    }

    get errors(): ValidationError[] {
        return this._errors
    }

    get errorMessages(): string[] {
        return this.errors.map((error) => error.message)
    }

    get hasGeneralErrors(): boolean {
        return this.errors.some((error) => error instanceof GeneralValidationError)
    }

    getPropertyErrorFor(propertyName: string): string | null {
        return this.invalidPropertiesErrors
            .filter(value => value.propertyName === propertyName)
            .map(value => value.message)
            .firstOrNull()
    }

    get generalErrorMessages(): string[] {
        return this.errors
            .filter((error) => error instanceof GeneralValidationError)
            .map((error) => error.message)
    }

    get invalidProperties(): string[] {
        return this.errors
            .filter((error) => error instanceof PropertyValidationError)
            .map((error) => (error as PropertyValidationError).propertyName)
            .distinct()
    }

    get invalidPropertiesErrors(): PropertyValidationError[] {
        return this.errors
            .filter((error) => error instanceof PropertyValidationError)
            .map((error) => (error as PropertyValidationError))
    }

    get propertyErrors(): { [property: string]: string } {
        return this.errors
            .filter((error) => error instanceof PropertyValidationError)
            .reduce((result, error) => {
                const propertyError = (error as PropertyValidationError)
                if (!result[propertyError.propertyName]) {
                    result[propertyError.propertyName] = propertyError.message
                }
                return result
            }, {})
    }

    allErrorMessages(generalErrorsKey = ''): { [property: string]: string } {
        const errors = this.propertyErrors
        if (this.hasGeneralErrors) {
            errors[generalErrorsKey] = this.generalErrorMessages.first()
        }
        return errors
    }
}
