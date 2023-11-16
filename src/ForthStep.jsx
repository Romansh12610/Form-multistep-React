import { } from 'react';
import { NextButton, PrevButton } from './Form';
import './ForthStep.scss';

export default function ForthStep() {

    // event handlers
    function handleNextClick() {

    }

    function handlePrevClick() {

    }

    return (
        <>
            <div className='forth-step'>
                <h2 className='forth-step__h2'>Finishing up</h2>
                <p className='forth-step__p'>Double-check everything looks <span className='forth-step__span-OK'>ok</span> before confirming</p>
                <ConfirmBlock 

                />
            </div>
            <NextButton 
                last={true}
                handleClick={handleNextClick}
            />
            <PrevButton 
                handleClick={handlePrevClick}
            />
        </>
    )
}

function ConfirmBlock({ }) {

    return (
        <section
            className='forth-step__confirm-section' 
        >
            <div className='forth-step__confirm-plan'>
                <h4>Selected Plan & Billing:</h4>
                <h3></h3>
            </div>
            <div className='forth-step__confirm-add-ons'>
                <h4>Selected Add-ons:</h4>
                <ul>
                    // { }
                </ul>
            </div>
        </section>
    )
}