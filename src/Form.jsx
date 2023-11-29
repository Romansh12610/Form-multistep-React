import { useContext } from 'react';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import ForthStep from './ForthStep';
import { StepContext, MakeChangesContext } from './Contexts';
import './MainSection.scss';

export default function Form() {
    const step = useContext(StepContext);
    const isMakeChanges = useContext(MakeChangesContext);

    const currentStep = step == 0 ? (<FirstStep isMakingChanges={isMakeChanges ? true : false}/>)
            : step == 1 ? (<SecondStep  isMakingChanges={isMakeChanges ? true : false}/>)
            : step == 2 ? (<ThirdStep  isMakingChanges={isMakeChanges ? true : false}/>)
            : (<ForthStep />);

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


export function NextButton({ handleClick, isDisabled, last = null }) {

    let className = 'main-section__next';
    if (isDisabled) {
        className += ' disabled';
    }

    return (
        <button 
            className={className}
            onClick={handleClick}
            onMouseUp={(e) => e.target.blur()}
            disabled={isDisabled}
        >{last ? "Confirm" : "Next Step"}</button>
    )
}

export function PrevButton ({ handleClick, isDisabled }) {

    let className = 'main-section__prev';
    if (isDisabled) {
        className += ' disabled';
    }

    return (
        <button 
            className={className}
            onClick={handleClick}
            onMouseUp={(e) => e.target.blur()}
            disabled={isDisabled}
        >Go Back</button>
    )
}