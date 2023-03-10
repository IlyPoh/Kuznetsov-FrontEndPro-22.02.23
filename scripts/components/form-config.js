import { isNotEmpty, maxLength, minLength, emailCheck, hasLowerCaseUpperCaseNumber, isEqualFields } from './validator.js';
import { TEXTS as T } from "./helpers.js";

export const loginFormConfig = {
    'username': [isNotEmpty, minLength(3), maxLength(25)],
    'email': [isNotEmpty, emailCheck],
    'password': [minLength(8), hasLowerCaseUpperCaseNumber, isEqualFields('password', 'confirm-password', T.password)],
    'confirm-password': [isEqualFields('password', 'confirm-password', T.password)],
};