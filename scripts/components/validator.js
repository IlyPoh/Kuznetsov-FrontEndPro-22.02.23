import ValidationError from "./validation-error.js";

export const Validator = {
    errors: {},
    
    validators: {
        isNotEmpty: {
            validate: (value) => value !== '',
            message: "The field can't be a blank.",
            errorType: 'required',
        },
        maxLength(length) {
            return {
                validate: (value) =>  value.length <= length,
                message: `Max length is ${length}.`,
                errorType: 'maxLength',
            }
        },
        minLength(length) {
            return {
                validate: (value) => value.length >= length,
                message: `Min length is ${length}.`,
                errorType: 'minLength',
            }
        },
        emailCheck: {
            validate: (value) => {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailPattern.test(value)
            },
            message: 'Incorrect email type.',
            errorType: 'emailPattern',
        },
        hasLowerCaseUpperCaseNumber: {
            validate: (value) => {
                const lowercaseRegex = /[a-z]/;
                const uppercaseRegex = /[A-Z]/;
                const numberRegex = /[0-9]/;
                return lowercaseRegex.test(value) && uppercaseRegex.test(value) && numberRegex.test(value);
            },
            message: 'This field should include at least 1 lowercase, uppercase and number character.',
            errorType: 'lowercaseUppercaseNumber',
        },
        isEqualFields(originalField, fieldToValidate, fieldType = 'Fields',  form = document.login) {
            return {
                validate: () => {
                    return form[originalField].value === form[fieldToValidate].value
                },
                message: `${fieldType} should be equal.`,
                errorType: 'equalField',
            }
        }
    },

    validate(form, config) {
        if(!(form instanceof HTMLFormElement)) {
            throw new ValidationError('You should provide HTML form');
        }

        let elements = form.elements;
        this.errors[form.name] = {};

        for (const [inputName, inputValidators] of Object.entries(config)) {
            if(!inputValidators.length) {
                continue;
            }

            if(!elements[inputName]) {
                throw new ValidationError(`The "${inputName}" field doesn't exist in the "${form.name}"`);
            }


            const value = elements[inputName].value;
            let errors = this.errors[form.name];

            inputValidators.forEach( ({ validate, message, errorType}) => {
                if(!validate(value)) {
                    errors[inputName] = {
                        ...errors[inputName],
                        [errorType]: message,
                    }
                }
            });
        }
        
        return !this._hasError(form.name);
    },

    getErrors(formName) {
        return this.errors[formName];
    },

    _hasError(formName) {
        return !!Object.keys(this.errors[formName]).length;
    },
}

export const { isNotEmpty, maxLength, minLength, emailCheck, hasLowerCaseUpperCaseNumber, isEqualFields } = Validator.validators;