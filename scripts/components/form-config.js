import { isNotEmpty, maxLength, minLength, emailCheck, hasLowerAndUpperCase, hasNumber, equalField } from './validator.js';

export const loginFormConfig = {
    'username': [isNotEmpty, maxLength(10)],
    'email': [isNotEmpty, emailCheck()],
    'password': [minLength(8), hasLowerAndUpperCase(), hasNumber()],
    'confirm-password': [equalField('password')],
};