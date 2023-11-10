import { useState, useRef } from 'react';
import './FirstStep.scss';
import Error from './Error';

export default function FirstStep({ step }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    return (
        <div className='first-step'>
            <h2 className='first-step__h2'>Personal info</h2>
            <p className='first-step__p'>
                Please provide your name, email address,
                and phone number
            </p>
            <FormField 
                label='Name'
                id='name'
                type='text'
                handleChange={handleChange}
                formData={formData}
                placeHolder="e.g. Stephen King"
            />
            <Error />
            <FormField 
                label='Email Address'
                id='email'
                type='email'
                handleChange={handleChange}
                formData={formData}
                placeHolder="e.g. stephenking@lorem.com"
            />
            <Error />
            <FormField 
                label='Phone Number'
                id='phone'
                type='tel'
                handleChange={handleChange}
                formData={formData}
                placeHolder="e.g. 1 234 567 890"
            />
            <Error />
        </div>
    )
}

function FormField({ label, id, type, handleChange, formData, placeHolder }) {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);

    let refToPass;
    switch (id) {
        case "name": {
            refToPass = nameRef;
            break;
        }
        case "email": {
            refToPass = emailRef;
            break;
        }
        case "phone": {
            refToPass = phoneRef;
            break;
        }
    }

    

    return (
        <>
            <label
                className='first-step__label' 
                htmlFor={id}
            >{label}</label>
            <input
                ref={refToPass}
                className='first-step__input' 
                type={type}
                id={id}
                name={id}
                value={formData[id]}
                onChange={handleChange}
                placeholder={placeHolder}
            />
        </>
    )
}