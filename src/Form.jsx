import { useState } from 'react';
import FirstStep from './FirstStep';

export default function Form( { step } ) {
    return (
        <section className='main__section'>
            <form className='main__form'>
                <FirstStep />
            </form>
        </section>
    )
}