import { useState, useRef, forwardRef } from 'react';
import './FirstStep.scss';
import { Error } from './Error';

export default function FirstStep({ step }) {
    // states
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });

    // refs
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    const nameErrorRef = useRef(null);
    const emailErrorRef = useRef(null);
    const phoneErrorRef = useRef(null);

    const name = nameRef.current;
    const email = emailRef.current;
    const phone = phoneRef.current;
    const nameErr = nameErrorRef.current;
    const emailErr = emailErrorRef.current;
    const phoneErr = phoneErrorRef.current;

    // handlers
    function handleChange(e) {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    function handleInput(e) {
        if (e.target.name == 'name') {
            if (name.validity.valid) {
                nameErr.classList.add('hide');
            } else {
                showError(name, nameErr);
            }
        }

        else if (e.target.name == 'email') {
            if (email.validity.valid) {
                emailErr.classList.add('hide');
            } else {
                showError(email, emailErr);
            }
        }

        else if (e.target.name == 'phone') {
            if (phone.validity.valid) {
                phoneErr.classList.add('hide');
            } else {
                showError(phone, phoneErr);
            }
        }
    }

    function showError(input, error) {
        error.classList.remove('hide');
        
        if (input.validity.tooShort) {
            error.textContent = `Your input is too short: current length - ${input.value.length}; expected length - ${input.minLength}`;
        }
        
        else if (input.validity.valueMissing) {
            console.log(phoneErr);
            error.textContent = 'This field is required';
        }

        else if (input.validity.patternMismatch) {
            error.textContent = `You should write a ${input.name} in the correct format, ${input.placeholder}`;
        }

        else if (input.validity.tooLong) {
            error.textContent = `Your input is too long: current length - ${input.value.length}; expected length - ${input.maxLength}`;
        }

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
            />
            <Error 
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
            />
            <Error 
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
                pattern='^\d{1}([\s])\(\d{3}\)\1\d{3}\1\d{2}\1\d{2}'
                minLength='13'
                maxLength='13'
                required='required'
            />
            <Error 
                ref={phoneErrorRef}
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