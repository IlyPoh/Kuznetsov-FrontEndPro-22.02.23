import { Validator } from './components/validator.js';
import { loginFormConfig } from './components/form-config.js';
import { setErrorState, setSuccessState, setNeutralState, changeHTML } from './components/helpers.js'

let forms = document.querySelectorAll('form');

forms.forEach((form) => {
    let elements = form.elements;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        [...elements].forEach( element => {
            if(element.type !== 'submit') {
                let errorBox = form.querySelector(`[data-for="${element.name}"]`);
    
                setNeutralState(element)
                changeHTML(errorBox, '')
            }
        })
    
        let isValid = Validator.validate(form, loginFormConfig);
    
        if(!isValid) {
            let errors = Validator.getErrors(form.name);
    
            Object.entries(errors).forEach(([name, errorObject]) => {
                let errorBox = form.querySelector(`[data-for="${name}"]`);
                setErrorState(elements[name], errorBox)
    
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
            setErrorState(target, errorBox)
            changeHTML(errorBox, errorMessage)
    
            return;
        }
    
        setSuccessState(target);
        changeHTML(errorBox, '')
    })
})