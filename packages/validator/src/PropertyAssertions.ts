/* eslint-disable eqeqeq */
import { Validator } from './Validator'
import { isInteger, isNullOrBlank, isNullOrEmpty, isNumber, isValidEmail } from './validations'

export class PropertyAssertions {
    private readonly name: string
    private readonly value: any
    private validator: Validator
    private hasPreviousErrors = false
    private isOptionalAndNotSet = false

    constructor(name: string, value: any, validator: Validator) {
        this.name = name
        this.value = value
        this.validator = validator
    }

    optional(): PropertyAssertions {
        this.isOptionalAndNotSet = isNullOrEmpty(this.value)
        return this
    }

    notNullOrEmpty(errorMessage?: string): PropertyAssertions {
        const isValid = !isNullOrEmpty(this.value)
        this.processValidation(isValid, errorMessage || (this.name + ' is required'))
        return this
    }

    notNullOrBlank(errorMessage?: string): PropertyAssertions {
        const isValid = !isNullOrBlank(this.value)
        this.processValidation(isValid, errorMessage || (this.name + ' is required'))
        return this
    }

    notNull(errorMessage?: string): PropertyAssertions {
        const isValid = this.value !== null && this.value !== undefined
        this.processValidation(isValid, errorMessage || (this.name + ' is required'))
        return this
    }

    number(errorMessage?: string): PropertyAssertions {
        const isValid = isNumber(this.value)
        this.processValidation(isValid, errorMessage || (this.name + ' must be a number'))
        return this
    }

    integer(errorMessage?: string): PropertyAssertions {
        const isValid = isInteger(this.value)
        this.processValidation(isValid, errorMessage || (this.name + ' must be an integer'))
        return this
    }

    positive(errorMessage?: string): PropertyAssertions {
        const isValid = this.value > 0
        this.processValidation(isValid, errorMessage || (this.name + ' must be positive'))
        return this
    }

    custom(validationFunc: (value) => boolean, errorMessage: string): PropertyAssertions {
        const isValid = validationFunc(this.value)
        this.processValidation(isValid, errorMessage)
        return this
    }

    zeroOrPositive(errorMessage?: string): PropertyAssertions {
        const isValid = this.value == 0 || this.value > 0
        this.processValidation(isValid, errorMessage || (this.name + ' must be positive'))
        return this
    }

    range(min: number, max: number, errorMessage?: string): PropertyAssertions {
        const isValid =
            parseFloat(this.value) >= min && parseFloat(this.value) <= max
        this.processValidation(isValid, errorMessage || (this.name + ` must be between ${min} and ${max}`))
        return this
    }

    equals(otherValue: any, errorMessage?: string): PropertyAssertions {
        const isValid = this.value === otherValue
        this.processValidation(isValid, errorMessage || (`${this.value} is not equal to ${otherValue}`))
        return this
    }

    email(errorMessage?: string): PropertyAssertions {
        const isValid = isValidEmail(this.value)
        this.processValidation(isValid, errorMessage || (this.name + ' must be a valid email'))
        return this
    }

    minLength(min: number, errorMessage?: string): PropertyAssertions {
        const isValid = (this.value?.toString()?.length ?? 0) >= min
        this.processValidation(isValid, errorMessage || (`${this.name} must have at lease ${min} characters`))
        return this
    }

    maxLength(max: number, errorMessage?: string): PropertyAssertions {
        const isValid = (this.value?.toString()?.length ?? 0) <= max
        this.processValidation(isValid, errorMessage || (`${this.name} must have less than ${max} characters`))
        return this
    }

    date(format: string, errorMessage?: string): PropertyAssertions {
        let isValid = true
        if (format === 'DD/MM/YYYY') {
            isValid = this.isValidDDMMYYYYDate('/')
        } else if(format === 'YYYY-MM-DD') {
            isValid = this.isValidYYYYMMDDDate('-')
        } else {
            throw new Error(`Unsupported date format: ${format}`)
        }
        this.processValidation(isValid, errorMessage || (`${this.name} must be a valid date`))
        return this
    }

    minDate(format: string, minDate: Date, errorMessage?: string): PropertyAssertions {
        let isValid = true
        if (format === 'DD/MM/YYYY') {
            const value = this.toDateFromDDMMYYYY('/')
            isValid = value.getTime() >= minDate.getTime()
        } else if (format === 'YYYY/MM/DD') {
            const value = this.toDateFromYYYYMMDD('-')
            isValid = value.getTime() >= minDate.getTime()
        } else {
            throw new Error(`Unsupported date format: ${format}`)
        }
        this.processValidation(isValid, errorMessage || (`${this.name} must be a valid date`))
        return this
    }

    maxDate(format: string, maxDate: Date, errorMessage?: string): PropertyAssertions {
        let isValid = true
        if (format === 'DD/MM/YYYY') {
            const value = this.toDateFromDDMMYYYY('/')
            isValid = value.getTime() <= maxDate.getTime()
        } else if (format === 'YYYY/MM/DD') {
            const value = this.toDateFromYYYYMMDD('-')
            isValid = value.getTime() <= maxDate.getTime()
        } else {
            throw new Error(`Unsupported date format: ${format}`)
        }
        this.processValidation(isValid, errorMessage || (`${this.name} must be a valid date`))
        return this
    }

    private processValidation(isValid: boolean, errorMessage: string) {
        if (this.hasPreviousErrors || this.isOptionalAndNotSet) { return }
        if (!isValid) {
            this.hasPreviousErrors = true
            this.validator.addPropertyError(this.name, errorMessage)
        }
    }

    private isValidDDMMYYYYDate(separator: string) {
        if (!this.value) return false
        const parsedDate = this.value.split(separator)
        const date = this.toDateFromDDMMYYYY(separator)
        return date.getDate() == parseInt(parsedDate[0], 10) &&
            date.getMonth() == parseInt(parsedDate[1], 10) - 1 &&
            date.getFullYear() == parseInt(parsedDate[2], 10)
    }

    private isValidYYYYMMDDDate(separator: string) {
        if (!this.value) return false
        const parsedDate = this.value.split(separator)
        const date = this.toDateFromYYYYMMDD(separator)
        return date.getDate() == parseInt(parsedDate[2], 10) &&
            date.getMonth() == parseInt(parsedDate[1], 10) - 1 &&
            date.getFullYear() == parseInt(parsedDate[0], 10)
    }

    private toDateFromDDMMYYYY(separator: string) {
        const parsedDate = this.value.split(separator)
        return new Date(parsedDate[2], parsedDate[1] - 1, parsedDate[0])
    }

    private toDateFromYYYYMMDD(separator: string) {
        const parsedDate = this.value.split(separator)
        return new Date(parsedDate[0], parsedDate[1] - 1, parsedDate[2])
    }
}
