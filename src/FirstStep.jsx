import { useState } from 'react';
import './FirstStep.scss';

export default function FirstStep() {
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
                handleChange={handleChange}
                formData={formData}
            />
            <FormField 
                label='Email Address'
                id='email'
                handleChange={handleChange}
                formData={formData}
            />
            <FormField 
                label='Phone Number'
                id='phone'
                handleChange={handleChange}
                formData={formData}
            />
        </div>
    )
}

function FormField({ label, id, handleChange, formData }) {
    return (
        <>
            <label
                className='first-step__label' 
                htmlFor={id}
            >{label}</label>
            <input
                className='first-step__input' 
                type='text'
                id={id}
                name={id}
                value={formData[id]}
                onChange={handleChange}
            />
        </>
    )
}