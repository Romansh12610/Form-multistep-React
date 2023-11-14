import { useState, useRef } from 'react';
import './SecondStep.scss';
import { NextButton, PrevButton } from './Form';
import arcadeIcon from './assets/images/icon-arcade.svg';
import advancedIcon from './assets/images/icon-advanced.svg';
import proIcon from './assets/images/icon-pro.svg';

export default function SecondStep() {
    const [plan, setPlan] = useState('');
    const [billing, setBilling] = useState('monthly');

    let arcadePrice = billing == 'monthly' ? '$9/mo' : '$90/yr';
    let advancedPrice = billing == 'monthly' ? '$12/mo' : '$120/yr';
    let proPrice = billing == 'monthly' ? '$15/mo' : '$150/yr';

    return (
        <>
        <div className='second-step'>
            <h2 className='second-step__h2'>Select your plan</h2>
            <p className='second-step__p'>You have the option of monthly or yearly billing.</p>
            <div className='second-step__card-section'>
                <Card status="arcade" title="Arcade" 
                    setPlan={setPlan}
                    plan={plan}
                    price={arcadePrice}
                />
                <Card status="advanced" title="Advanced" 
                    setPlan={setPlan}
                    plan={plan} 
                    price={advancedPrice}
                />
                <Card status="pro" title="Pro" 
                    setPlan={setPlan}
                    plan={plan}
                    price={proPrice}
                />
            </div>
            <Toggler
                billing={billing} 
                setBilling={setBilling}
            />
        </div>
        <NextButton />
        <PrevButton />
        </>
    )
}

function Card({ plan, setPlan, status, title, price }) {
    const srcImg = status == 'arcade' ? arcadeIcon
        : status == 'advanced' ? advancedIcon
        : proIcon;

    let cardClassName = plan == status ? 'second-step__card chosen'
        : 'second-step__card';
    

    function handleClick(e) {
        let target = e.target.closest('div');

        setPlan(target.id);
    }

    return (
        <div className={cardClassName}
            id={status} 
            tabIndex={0}
            onClick={handleClick}
        >
            <img src={srcImg} className='second-step__icon'/>
            <h4 className='second-step__h4'>{title}</h4>
            <p className='second-step__p'>{price}</p>
        </div>
    )
}

const Toggler = ({ billing, setBilling }) => {
    const buttonRef = useRef(null);
    
    let firstLabelClassName = billing == 'monthly' ? 'second-step__label chosen' : 'second-step__label';
    let lastLabelClassName = billing == 'yearly' ? 'second-step__label chosen' : 'second-step__label';
    let circleClassName = 'second-step__toggle-circle';
    let toggleClassName = 'second-step__toggle-button';
    if (billing == 'yearly') {
        circleClassName += ' pressed';
        toggleClassName += ' pressed';
    }
    
    const handleClick = (e) => {
        e.preventDefault();
        if (billing == 'monthly') {
            setBilling('yearly');
            buttonRef.current.setAttribute('aria-pressed', 'true');
        } else {
            setBilling('monthly');
            buttonRef.current.setAttribute('aria-pressed', 'false');
        }
    }

    const handleLabelClick = (e) => {
        const target = e.target.closest('label');
        if (!target) return;

        setBilling(target.id);
    }

    return (
        <div className='second-step__toggle-wrapper'>
            <label className={firstLabelClassName} 
                id="monthly"
                onClick={handleLabelClick}
            >Monthly</label>
            <button
                className={toggleClassName}
                onClick={handleClick}
                ref={buttonRef}
            >
                <span
                    className={circleClassName}
                ></span>
            </button>
            <label className={lastLabelClassName} 
                id="yearly"
                onClick={handleLabelClick}
            >Yearly</label>
        </div>
    )
}