import { useContext } from 'react';
import { StepContext } from './App';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import './MainSection.scss';

export default function Form() {
    const step = useContext(StepContext);
    const currentStep = step == 0 ? (<FirstStep />)
            : step == 1 ? (<SecondStep />)
            : (<ThirdStep />);

    return (
        <section className='main-section'>
            <form className='main-section__form' noValidate>
                <fieldset className='main-section__fieldset'>
                    {currentStep}
                </fieldset> 
            </form>
        </section>
    )
}


export function NextButton({ handleClick }) {
    return (
        <button 
            className='main-section__next'
            onClick={handleClick}
        >Next Step</button>
    )
}

export function PrevButton ({ handleClick }) {
    return (
        <button 
            className='main-section__prev'
            onClick={handleClick}
        >Go Back</button>
    )
}