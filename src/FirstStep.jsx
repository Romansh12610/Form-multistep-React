import { useRef, useContext, useEffect, forwardRef } from 'react';
import './FirstStep.scss';
import { Error } from './Error';
import { InputContext, InputSetterContext, NextButton, MakeChangesSetterContext} from './Form';
import { StepContext, StepSetterContext } from './App';

export default function FirstStep({ isMakingChanges }) {
    // contexts
    const formData = useContext(InputContext);
    const setFormData = useContext(InputSetterContext);
    const setIsMakeChanges = useContext(MakeChangesSetterContext);

    // refs
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    const nameErrorRef = useRef(null);
    const emailErrorRef = useRef(null);
    const phoneErrorRef = useRef(null);
    const timerId = useRef(null);

    // contexts
    const step = useContext(StepContext);
    const setStep = useContext(StepSetterContext);

    // effect 
    useEffect(() => {
        showError(nameRef.current, nameErrorRef.current);
        showError(emailRef.current, emailErrorRef.current);
        showError(phoneRef.current, phoneErrorRef.current);
    }, []);

    // event handlers
    function showAcceptedChanges(targetNode, targetName) {
        let message = "Changes accepted! Hope you do not lie to us...";

        if (targetNode.validity.valid) {
            switch (targetName) {
                case "name": {
                    nameErrorRef.current.style.color = 'green';
                    nameErrorRef.current.textContent = message;
                    setTimeout(() => {
                        nameErrorRef.current.textContent = '';
                        nameErrorRef.current.style.color = '';
                    }, 3000);
                    break;
                }
                case "email": {
                    emailErrorRef.current.style.color = 'green';
                    emailErrorRef.current.textContent = message;
                    setTimeout(() => {
                        emailErrorRef.current.textContent = '';
                        emailErrorRef.current.style.color = '';
                    }, 3000);
                    break;
                }
                case "phone": {
                    phoneErrorRef.current.style.color = 'green';
                    phoneErrorRef.current.textContent = message;
                    setTimeout(() => {
                        phoneErrorRef.current.textContent = '';
                        phoneErrorRef.current.style.color = '';
                    }, 3000);
                    break;
                }
            }
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        if (isMakingChanges) {
            if (timerId.current != null) {
                clearTimeout(timerId.current);
            }
            timerId.current = setTimeout(() => {
                showAcceptedChanges(e.target, name);
            }, 2000);
        }
    }

    function handleInput(e) {

        if (e.target.name == 'name') {
            if (nameRef.current.validity.valid) {
                nameErrorRef.current.textContent = '';
            } else {
                showError(nameRef.current, nameErrorRef.current);
            }
        }

        else if (e.target.name == 'email') {
            if (emailRef.current.validity.valid) {
                emailErrorRef.current.textContent = '';
            } else {
                showError(emailRef.current, emailErrorRef.current);
            }
        }

        else if (e.target.name == 'phone') {
            if (phoneRef.current.validity.valid) {
                phoneErrorRef.current.textContent = '';
            } else {
                showError(phoneRef.current, phoneErrorRef.current);
            }
        }
    }

    function showError(input, error) {

        if (input.validity.valueMissing) {
            error.textContent = 'This field is required';
        }
        
        else if (input.validity.tooShort) {
            error.textContent = `Your input is too short: current length - ${input.value.length}; expected length - ${input.minLength}`;
        }

        else if (input.validity.patternMismatch) {
            error.textContent = `You should write a ${input.name} in the correct format, ${input.placeholder}`;
        }

        else if (input.validity.tooLong) {
            error.textContent = `Your input is too long: current length - ${input.value.length}; expected length - ${input.maxLength}`;
        }

    }

    function handleFirstStep(e) {
        e.preventDefault();
        
        const inputs = document.querySelectorAll('.first-step__input');
        for (let input of inputs) {
            if (!input.validity.valid) {
                input.focus();
                return;
            }
        }

        setStep((step + 1));
        setIsMakeChanges(false);
    }

    return (
        <div className='first-step'>
            <h2 className='first-step__h2'>Personal info</h2>
            <p className='first-step__p'>
                Please provide your name, email address,
                and phone number
            </p>
            <FormField
                ref={nameRef} 
                label='Name'
                id='name'
                type='text'
                handleChange={handleChange}
                handleInput={handleInput}
                formData={formData}
                placeHolder='e.g. Stephen King'
                pattern='^([A-Z]{1}[a-z]+)\s([A-Z]{1}[a-z]+)'
                minLength='6'
                required='required'
            />
            <Error
                required={false} 
                ref={nameErrorRef}
            />
            <FormField
                ref={emailRef} 
                label='Email Address'
                id='email'
                type='email'
                handleChange={handleChange}
                handleInput={handleInput}
                formData={formData}
                placeHolder='e.g. stephenking@lorem.com'
                pattern='^.+@[a-zA-Z]+\.[a-zA-Z]{3,5}'
                minLength='8'
                required='required'
            />
            <Error
                required={false} 
                ref={emailErrorRef}
            />
            <FormField
                ref={phoneRef} 
                label='Phone Number'
                id='phone'
                type='tel'
                handleChange={handleChange}
                handleInput={handleInput}
                formData={formData}
                placeHolder='e.g. 1 234 567 890'
                pattern='^\d{1}(\s)\d{3}\1\d{3}\1\d{2}\1\d{2}'
                minLength='15'
                maxLength='15'
                required='required'
            />
            <Error
                required={true} 
                ref={phoneErrorRef}
            />
            <NextButton 
                handleClick={handleFirstStep}
            />
        </div>
    )
}

const FormField = forwardRef(({ label, id, type, handleChange, handleInput, formData, placeHolder, pattern, minLength, maxLength, required }, ref) => { 

    return (
        <>
            <label
                className='first-step__label' 
                htmlFor={id}
            >{label}</label>
            <input
                ref={ref}
                className='first-step__input' 
                type={type}
                id={id}
                name={id}
                value={formData[id]}
                onChange={handleChange}
                onInput={handleInput}
                placeholder={placeHolder}
                pattern={pattern}
                minLength={minLength}
                maxLength={maxLength}
                required={required}
            />
        </>
    )
})