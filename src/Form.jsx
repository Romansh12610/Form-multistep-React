import { useState, useContext, createContext } from 'react';
import { StepContext } from './App';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import './MainSection.scss';

export const BillingContext = createContext(null);
export const BillingSetterContext = createContext(null);
export const PanelsContext = createContext(null);
export const PanelsSetterContext = createContext(null);

export default function Form() {
    const step = useContext(StepContext);
    const [billing, setBilling] = useState('monthly');
    const [panels, setPanels] = useState([
        {   
            id: 0, 
            chosen: false, 
            title: "Online service",
            subtitle: "Access to multiplayer games",
            monthPrice: "+$1/mo",
            yearPrice: "+$10/yr"
        },
        { 
            id: 1, 
            chosen: false,
            title: "Larget storage",
            subtitle: "Extra 1TB of cloud save",
            monthPrice: "+$2/mo",
            yearPrice: "+$20/yr"
        },
        { 
            id: 2,
            chosen: false,
            title: "Customizable profile",
            subtitle: "Custom theme on your profile",
            monthPrice: "+$2/mo",
            yearPrice: "+$20/yr"
        }
    ]);


    const currentStep = step == 0 ? (<FirstStep />)
            : step == 1 ? (<SecondStep />)
            : (<ThirdStep />);

    return (
        <section className='main-section'>
            <form className='main-section__form' noValidate>
                <fieldset className='main-section__fieldset'>
                    <BillingContext.Provider value={billing}>
                        <BillingSetterContext.Provider value={setBilling}>
                            <PanelsContext.Provider value={panels}>
                                <PanelsSetterContext.Provider value={setPanels}>
                                    {currentStep}
                                </PanelsSetterContext.Provider>
                            </PanelsContext.Provider>
                        </BillingSetterContext.Provider>
                    </BillingContext.Provider>
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