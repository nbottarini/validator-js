import each from 'jest-each'
import { Validator } from '../src/Validator'

describe('notNull', () => {
    each([
        -54, -24.12, 100, 'str', '', ' ',
    ]).test('valid inputs %s', (input) => {
        validator.check('someProperty', input).notNull()

        expect(validator.hasErrors()).toEqual(false)
    })

    each([
        null, undefined,
    ]).test('invalid inputs %s', (input) => {
        validator.check('someProperty', input).notNull()

        expect(validator.hasErrors()).toEqual(true)
    })
})

describe('notNullOrEmpty', () => {
    each([
        -54, -24.12, 100, 'str',
    ]).test('valid inputs %s', (input) => {
        validator.check('someProperty', input).notNullOrEmpty()

        expect(validator.hasErrors()).toEqual(false)
    })

    each([
        '', null, undefined,
    ]).test('invalid inputs %s', (input) => {
        validator.check('someProperty', input).notNullOrEmpty()

        expect(validator.hasErrors()).toEqual(true)
    })
})

describe('notNullOrBlank', () => {
    each([
        -54, -24.12, 100, 'str',
    ]).test('valid inputs %s', (input) => {
        validator.check('someProperty', input).notNullOrBlank()

        expect(validator.hasErrors()).toEqual(false)
    })

    each([
        '', '  ', null, undefined,
    ]).test('invalid inputs %s', (input) => {
        validator.check('someProperty', input).notNullOrBlank()

        expect(validator.hasErrors()).toEqual(true)
    })
})

describe('number', () => {
    each([
        0, 18, 6, 1000, '100', '67.32', 132.50,
    ]).test('valid inputs %s', (input) => {
        validator.check('someProperty', input).number()

        expect(validator.hasErrors()).toEqual(false)
    })

    each([
        'str', '', ' ', true, false, '12..12', '12.12.12', '12,2.3', '100,3', null, undefined,
    ]).test('invalid inputs %s', (input) => {
        validator.check('someProperty', input).number()

        expect(validator.hasErrors()).toEqual(true)
    })
})

describe('integer', () => {
    each([
        0, 18, 6, 1000,
    ]).test('valid inputs %s', (input) => {
        validator.check('integer', input).integer()

        expect(validator.hasErrors()).toEqual(false)
    })

    each([
        '67.32', 132.50, 'str', '', ' ', true, false, '12,2', '13.2,3', undefined, null,
    ]).test('invalid inputs %s', (input) => {
        validator.check('integer', input).integer()

        expect(validator.hasErrors()).toEqual(true)
    })
})

describe('positive', () => {
    each([
        '5', 1345, 679, 466.23,
    ]).test('valid inputs %s', (input) => {
        validator.check('someProperty', input).positive()

        expect(validator.hasErrors()).toEqual(false)
    })

    each([
        '0', 0, '000', '-5', '-23.32', -8, -466.23, null, undefined,
    ]).test('invalid inputs %s', (input) => {
        validator.check('someProperty', input).positive()

        expect(validator.hasErrors()).toEqual(true)
    })
})

describe('zeroOrPositive', () => {
    each([
        '0', '5', '0000', '1345', 0, 679, 466.23,
    ]).test('valid inputs %s', (input) => {
        validator.check('someProperty', input).zeroOrPositive()

        expect(validator.hasErrors()).toEqual(false)
    })

    each([
        '-5', '-23.32', -8, -466.23, null, undefined,
    ]).test('invalid inputs %s', (input) => {
        validator.check('someProperty', input).zeroOrPositive()

        expect(validator.hasErrors()).toEqual(true)
    })
})

describe('equals', () => {
    test('valid', () => {
        validator.check('someProperty', '1234').equals('1234')

        expect(validator.hasErrors()).toEqual(false)
    })

    test('invalid', () => {
        validator.check('someProperty', '1234').equals('5678')

        expect(validator.hasErrors()).toEqual(true)
    })
})

describe('email', () => {
    each([
        'some@email.com', 'alice.thompson@email.com', 'my@address.com.ar',
    ]).test('valid inputs %s', (input) => {
        validator.check('someProperty', input).email()

        expect(validator.hasErrors()).toEqual(false)
    })

    each([
        'withoutAt', 'email@address', 'email@@address.com', '', null, undefined,
    ]).test('invalid inputs %s', (input) => {
        validator.check('someProperty', input).email()

        expect(validator.hasErrors()).toEqual(true)
    })
})

describe('minLength', () => {
    each([
        '12345', '123456', 'asdasd',
    ]).test('valid inputs %s', (input) => {
        validator.check('someProperty', input).minLength(5)

        expect(validator.hasErrors()).toEqual(false)
    })

    each([
        '', 'asdf', '1234', null, undefined,
    ]).test('invalid inputs %s', (input) => {
        validator.check('someProperty', input).minLength(5)

        expect(validator.hasErrors()).toEqual(true)
    })
})

describe('maxLength', () => {
    each([
        '', 'asdf', '1234', '12345', null, undefined,
    ]).test('valid inputs %s', (input) => {
        validator.check('someProperty', input).maxLength(5)

        expect(validator.hasErrors()).toEqual(false)
    })

    each([
        '123456', 'asdasd',
    ]).test('invalid inputs %s', (input) => {
        validator.check('someProperty', input).maxLength(5)

        expect(validator.hasErrors()).toEqual(true)
    })
})

describe('date with DD/MM/YYYY format', () => {
    each([
        '12/06/2020', '12/6/2020',
    ]).test('valid inputs %s', (input) => {
        validator.check('someProperty', input).date('DD/MM/YYYY')

        expect(validator.hasErrors()).toEqual(false)
    })

    each([
        '', 'asdasd', '9//2020', '9/2020', '2020-06-12', '1/16/2020', null, undefined,
    ]).test('invalid inputs %s', (input) => {
        validator.check('someProperty', input).date('DD/MM/YYYY')

        expect(validator.hasErrors()).toEqual(true)
    })
})

describe('date with YYYY-MM-DD format', () => {
    each([
        '2020-06-12', '2020-6-12',
    ]).test('valid inputs %s', (input) => {
        validator.check('someProperty', input).date('YYYY-MM-DD')

        expect(validator.hasErrors()).toEqual(false)
    })

    each([
        '', 'asdasd', '9--2020', '9-2020', '1-16-2020', null, undefined,
    ]).test('invalid inputs %s', (input) => {
        validator.check('someProperty', input).date('YYYY-MM-DD')

        expect(validator.hasErrors()).toEqual(true)
    })
})

beforeEach(() => {
    validator = new Validator()
})

let validator: Validator
