[![npm](https://img.shields.io/npm/v/@nbottarini/validator.svg)](https://www.npmjs.com/package/@nbottarini/validator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI Status](https://github.com/nbottarini/validator-js/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/nbottarini/validator-js/actions)

# Validator
A javascript/typescript validation library

## Installation

Npm:
```
$ npm install --save @nbottarini/validator
```

Yarn:
```
$ yarn add @nbottarini/validator
```

## Usage

```typescript
function validate(validator: Validator, form: SignupForm) {
    validator.check('firstName', form.firstName)
        .notNullOrBlank()
        .minLength(2)
        .maxLength(50)
    
    validator.check('age', form.age)
        .optional()
        .number('Must be a valid number')
        .min(18, 'Must be older than 18')

    validator.check('email', form.email)
        .email()

    validator.check('date', form.date)
        .date('DD/MM/YYYY')

    validator.check('password', form.password)
        .notNullOrBlank()
        .minLength(8)

    validator.check('confirmPassword', form.confirmPassword)
        .equals(form.password)

    validator.check('maxPrice', form.maxPrice)
        .zeroOrPositive(form.maxPrice)

    validator.check('evenNumber', form.evenNumber)
        .custom((value) => value % 2 === 0, 'Must be even')
}

const validator = new Validator()
validate(validator, signupForm)
const hasErrors = validator.hasErrors()
const errors = validator.allErrorMessages()

try {
    validator.throwIfHasErrors()
} catch (e) {
    // Do something with thrown error
}
```
