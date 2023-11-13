import { useState, useContext } from 'react';
import './SecondStep.scss';
import { NextButton } from './Form';
import arcadeIcon from './assets/images/icon-arcade.svg';
import advancedIcon from './assets/images/icon-advanced.svg';
import proIcon from './assets/images/icon-pro.svg';

export default function SecondStep() {
    const [billing, setBilling] = useState('monthly');

    function handleClick() {
        console.log("click");
        setBilling(prevBilling => {
            if (prevBilling == 'monthly') {
                return 'yearly';
            } else {
                return 'monthly';
            }
        });
    }

    function handleChange(e) {
        e.preventDefault();
        setBilling(e.target.value);
    }

    let circleClassName = 'second-step__toggle-circle';
    let toggleClassName = 'second-step__toggle-button';
    if (billing == 'yearly') {
        circleClassName += ' pressed';
        toggleClassName += ' pressed';
    }

    return (
        <div className='second-step'>
            <h2 className='second-step__h2'>Select your plan</h2>
            <p className='second-step__p'>You have the option of monthly or yearly billing.</p>
            <div className='second-step__card-section'>
                <Card status="arcade" title="Arcade" price="2$"/>
                <Card status="advanced" title="Advanced" price="4$"/>
                <Card status="pro" title="Pro" price="6$"/>
            </div>
            <Toggler 
                billing={billing}
                handleClick={handleClick}
                handleChange={handleChange}
                circleClassName={circleClassName}
                toggleClassName={toggleClassName}
            />
            <NextButton />
        </div>
    )
}

function Card({ status, title, price }) {
    const srcImg = status == 'arcade' ? arcadeIcon
        : status == 'advanced' ? advancedIcon
        : proIcon;

    return (
        <div className='second-step__card'>
            <img src={srcImg} className='second-step__icon'/>
            <h4 className='second-step__h4'>{title}</h4>
            <p className='second-step__p'>{price}</p>
        </div>
    )
}

function Toggler({ billing, handleClick, handleChange, circleClassName, toggleClassName }) {
    return (
        <div className='second-step__toggle-wrapper'>
            <label htmlFor='monthly' className='second-step__label'>Monthly</label>
            <span 
                className={toggleClassName} 
                onClick={handleClick}> 
                <input 
                    className='second-step__input' 
                    type='radio'      
                    id='monthly' 
                    name='billing'
                    value='monthly'
                    checked={billing === 'monthly'}
                    onChange={handleChange}
                />
                <input 
                    className='second-step__input' 
                    type='radio' 
                    id='yearly' 
                    name='billing'
                    value='yearly'
                    checked={billing === 'yearly'}
                    onChange={handleChange}
                />
                <span className={circleClassName}></span>
            </span>
            <label htmlFor='yearly' className='second-step__label'>Yearly</label>
        </div>
    )
}