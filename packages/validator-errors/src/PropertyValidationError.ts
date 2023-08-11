import { ValidationError } from './ValidationError'

export class PropertyValidationError extends ValidationError {
    private readonly _propertyName: string

    constructor(propertyName: string, message: string) {
        super(message)
        this._propertyName = propertyName
    }

    get propertyName(): string {
        return this._propertyName
    }
}
