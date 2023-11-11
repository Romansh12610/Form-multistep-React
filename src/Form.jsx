import { useState } from 'react';
import FirstStep from './FirstStep';
import './MainSection.scss';

export default function Form( { step, handleStep } ) {
    return (
        <section className='main-section'>
            <form className='main-section__form' noValidate>
                <fieldset className='main-section__fieldset'>
                    <FirstStep />
                </fieldset> 
                <NextButton handleStep={handleStep} />
            </form>
        </section>
    )
}

function NextButton({ handleStep }) {
    return (
        <button 
            className='main-section__next'
            onClick={handleStep}
        >Next Step</button>
    )
}