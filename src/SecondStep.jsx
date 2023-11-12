import { useState, useContext } from 'react';
import './SecondStep.scss';
import { NextButton } from './Form';
import arcadeIcon from './assets/images/icon-arcade.svg';
import advancedIcon from './assets/images/icon-advanced.svg';
import proIcon from './assets/images/icon-pro.svg';

export default function SecondStep() {

    return (
        <div className='second-step'>
            <h2 className='second-step__h2'>Select your plan</h2>
            <p className='second-step__p'>You have the option of monthly or yearly billing.</p>
            <div className='second-step__card-section'>
                <Card status="arcade" title="Arcade" price="2$"/>
                <Card status="advanced" title="Advanced" price="4$"/>
                <Card status="pro" title="Pro" price="6$"/>
            </div>
            <Toggler />
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

function Toggler() {
    
}