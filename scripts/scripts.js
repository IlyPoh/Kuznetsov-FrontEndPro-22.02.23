import { Validator } from './components/validator.js';
import { loginFormConfig } from './components/form-config.js';

let forms = document.querySelectorAll('form');

forms.forEach((form) => {
    let elements = form.elements;
    let errorChecker = false;
    let successChecker = false;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        [...elements].forEach( element => {
            if(element.type !== 'submit') {
                let errorBox = form.querySelector(`[data-for="${element.name}"]`);
    
                errorChecker = false;
                successChecker = false;
    
                stateChecker(element);
                changeHTML(errorBox, '')
            }
        })
    
        let isValid = Validator.validate(form, loginFormConfig);
    
        if(!isValid) {
            let errors = Validator.getErrors(form.name);
    
            Object.entries(errors).forEach(([name, errorObject]) => {
                let errorBox = form.querySelector(`[data-for="${name}"]`);
                errorChecker = true;
                stateChecker(elements[name], errorBox);
    
                let errorMessage = Object.values(errorObject).map( message => `<p>${message}</p>`).join('');
                changeHTML(errorBox, errorMessage)
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
            let errorMessage = Object.values(errors).map( message => `<p>${message}</p>`).join('');
            errorChecker = true;
            stateChecker(target, errorBox)
            changeHTML(errorBox, errorMessage)
    
            return;
        }
    
        errorChecker = false;
        successChecker = true;
    
        stateChecker(target);
        changeHTML(errorBox, '')
    })
    
    const stateChecker = (...elems) => {
        for (const elem of elems) {
            if (errorChecker) {
                successChecker = false;
                elem.classList.add('error');
                elem.classList.remove('success');
            } else if (successChecker) {
                elem.classList.remove('error');
                elem.classList.add('success')
            } else {
                elem.classList.remove('error');
                elem.classList.remove('success')
            }
        }
    }
    
    const changeHTML = (e, value) => {
        e.innerHTML = value;
    }
})