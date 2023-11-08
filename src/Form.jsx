import { useState } from 'react';
import FirstStep from './FirstStep';
import './MainSection.scss';

export default function Form( { step } ) {
    return (
        <section className='main-section'>
            <form className='main-section__form'>
                <FirstStep />
            </form>
        </section>
    )
}