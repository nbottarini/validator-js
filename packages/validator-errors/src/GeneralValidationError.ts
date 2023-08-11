import { ValidationError } from './ValidationError'

export class GeneralValidationError extends ValidationError {
    constructor(message: string) {
        super(message)
    }
}
