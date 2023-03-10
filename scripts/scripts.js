import { Validator } from './components/validator.js';
import { loginFormConfig } from './components/form-config.js';
import { setErrorState, setSuccessState, setNeutralState, changeHTML } from './components/helpers.js'

const forms = document.querySelectorAll('form');

const handleFormSubmit = (form) => (e) => {
    e.preventDefault();

    const elements = form.elements;
        
    [...elements].forEach( element => {
        if(element.type !== 'submit') {
            const errorBox = form.querySelector(`[data-for="${element.name}"]`);

            setNeutralState(element)
            changeHTML(errorBox, '')
        }
    })
    
    const isValid = Validator.validate(form, loginFormConfig);
    
    if(!isValid) {
        const errors = Validator.getErrors(form.name);

        Object.entries(errors).forEach(([name, errorObject]) => {
            const errorBox = form.querySelector(`[data-for="${name}"]`);
            setErrorState(elements[name], errorBox)

            const errorMessage = Object.values(errorObject).map( message => `<p>${message}</p>`).join('');
            changeHTML(errorBox, errorMessage)
        });
    };
}

const handleFormInput = (form) => (e) => {
    const target = e.target;
    const errorBox = form.querySelector(`[data-for="${target.name}"]`);
    
    const isValid = Validator.validate(
        form, 
        { [target.name]: loginFormConfig[target.name] },
    );

    if(!isValid) {
        const errors = Validator.getErrors(form.name)?.[target.name];
        const errorMessage = Object.values(errors).map( message => `<p>${message}</p>`).join('');
        setErrorState(target, errorBox)
        changeHTML(errorBox, errorMessage)

        return;
    }

    setSuccessState(target);
    changeHTML(errorBox, '')
}

forms.forEach((form) => {
    form.addEventListener('submit', handleFormSubmit(form));
    form.addEventListener('input', handleFormInput(form));
})