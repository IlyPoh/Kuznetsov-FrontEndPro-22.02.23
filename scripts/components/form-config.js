import { isNotEmpty, maxLength, minLength, emailCheck, hasLowerCaseUpperCaseNumber, isEqualFields } from './validator.js';

export const loginFormConfig = {
    'username': [isNotEmpty, minLength(3), maxLength(25)],
    'email': [isNotEmpty, emailCheck],
    'password': [minLength(8), hasLowerCaseUpperCaseNumber],
    'confirm-password': [isEqualFields('password', 'confirm-password', 'Passwords')],
};