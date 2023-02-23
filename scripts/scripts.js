import { Validator } from './components/validator.js';
import { loginFormConfig } from './components/form-config.js';

let form = document.login;
let elements = form.elements;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    [...elements].forEach( element => {
        if(element.type !== 'submit') {
            let errorBox = form.querySelector(`[data-for="${element.name}"]`);
            errorBox.innerHTML = '';
            element.classList.remove('error');
        }
    })

    let isValid = Validator.validate(form, loginFormConfig);

    if(!isValid) {
        let errors = Validator.getErrors(form.name);

        Object.entries(errors).forEach(([name, errorObject]) => {
            let errorBox = form.querySelector(`[data-for="${name}"]`);
            form.elements[name].classList.add('error');
            errorBox.classList.add('error');

            let fullMessage = Object.values(errorObject).map( message => `<p>${message}</p>`).join('');
            errorBox.innerHTML = fullMessage;
        });
    };
});


form.addEventListener('input', (e) => {
    let target = e.target;
    let errorBox = form.querySelector(`[data-for="${target.name}"]`);

    let isValid = Validator.validate(
        form, 
        { [target.name]: loginFormConfig[target.name] },
    );

    if(!isValid) {
        let errors = Validator.getErrors(form.name)?.[target.name];
        let fullMessage = Object.values(errors).map( message => `<p>${message}</p>`).join('');
        target.classList.add('error');
        errorBox.classList.add('error');
        errorBox.innerHTML = fullMessage;

        return;
    }

    errorBox.innerHTML = '';
    target.classList.remove('error');
    target.classList.add('success')
})