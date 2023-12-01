import './MainSection.scss';

export default function Form({ children }) {

    return (
        <section className='main-section'>
            <form className='main-section__form' noValidate>
                <fieldset className='main-section__fieldset'>
                    {children}
                </fieldset> 
            </form>
        </section>
    )
}


export function NextButton({ handleClick, isDisabled, last = false }) {

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