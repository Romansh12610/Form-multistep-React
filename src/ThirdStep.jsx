import './ThirdStep.scss';
import { NextButton, PrevButton } from './Form';

export default function ThirdStep() {


    return (
        <>
            <div className='third-step'>
                <h2 className='third-step__h2'>Pick add-ons</h2>
                <p className='third-step__p'>Add-ons help enhance your gaming experience.</p>
            </div>
            <NextButton />
            <PrevButton />
        </>
        
    )
}