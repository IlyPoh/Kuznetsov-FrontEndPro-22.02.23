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
                errorType: 'max length',
            }
        },
        minLength(length) {
            return {
                validate: (value) => value.length >= length,
                message: `Min length is ${length}.`,
                errorType: 'min length',
            }
        },
        emailCheck() {
            return {
                validate: (value) => {
                    const emailPattern =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return emailPattern.test(value)
                },
                message: 'Incorrect email type.',
                errorType: 'email pattern',
            }
        },
        hasLowerAndUpperCase() {
            return {
                validate: (value) => {
                    const lowercaseRegex = /[a-z]/;
                    const uppercaseRegex = /[A-Z]/;
                    return lowercaseRegex.test(value) && uppercaseRegex.test(value);
                },
                message: 'This field should include at least 1 lowercase and 1 uppercase character.',
                errorType: 'lowercase uppercase',
            }
        },
        hasNumber() {
            return {
                validate: (value) => {
                    const numberRegex = /[0-9]/;
                    return numberRegex.test(value)
                },
                message: 'This field should include at least 1 number character.',
                errorType: 'number',
            }
        },
        equalField(field, form = document.login) {
            return {
                validate: (value) => {
                    return value === form[field].value;
                },
                message: `This field should be equal to ${form[field].name} field.`,
                errorType: 'equal field',
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

export const { isNotEmpty, maxLength, minLength, emailCheck, hasLowerAndUpperCase, hasNumber, equalField } = Validator.validators;