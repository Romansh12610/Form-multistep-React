import { useState, useContext, createContext } from 'react';
import { StepContext } from './App';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import ForthStep from './ForthStep';
import './MainSection.scss';

export const InputContext = createContext(null);
export const InputSetterContext = createContext(null);
export const BillingContext = createContext(null);
export const BillingSetterContext = createContext(null);
export const CardsContext = createContext(null);
export const CardsSetterContext = createContext(null);
export const PanelsContext = createContext(null);
export const PanelsSetterContext = createContext(null);

export default function Form() {
    const step = useContext(StepContext);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [billing, setBilling] = useState('monthly');
    const [cards, setCards] = useState([
        {
            id: 0,
            status: "arcade",
            title: "Arcade",
            monthPrice: "+$9/mo",
            yearPrice: "+$90/yr",
            chosen: false
        },
        {
            id: 1,
            status: "advanced",
            title: "Advanced",
            monthPrice: "+$12/mo",
            yearPrice: "+$120/yr",
            chosen: false
        },
        {
            id: 2,
            status: "pro",
            title: "Pro",
            monthPrice: "+$15/mo",
            yearPrice: "+$150/yr",
            chosen: false
        }
    ]);

    const [panels, setPanels] = useState([
        {   
            id: 0, 
            chosen: false, 
            title: "Online service",
            subtitle: "Access to multiplayer games",
            monthPrice: "+$1/mo",
            yearPrice: "+$10/yr",
            priceNumber: {
                month: 1,
                year: 10
            }
        },
        { 
            id: 1, 
            chosen: false,
            title: "Larger storage",
            subtitle: "Extra 1TB of cloud save",
            monthPrice: "+$2/mo",
            yearPrice: "+$20/yr",
            priceNumber: {
                month: 2,
                year: 20
            }
        },
        { 
            id: 2,
            chosen: false,
            title: "Customizable profile",
            subtitle: "Custom theme on your profile",
            monthPrice: "+$2/mo",
            yearPrice: "+$20/yr",
            priceNumber: {
                month: 2,
                year: 20
            }
        }
    ]);


    const currentStep = step == 0 ? (<FirstStep />)
            : step == 1 ? (<SecondStep />)
            : step == 2 ? (<ThirdStep />)
            : (<ForthStep />);

    return (
        <section className='main-section'>
            <form className='main-section__form' noValidate>
                <fieldset className='main-section__fieldset'>
                    <InputContext.Provider value={formData}>
                        <InputSetterContext.Provider value={setFormData}>
                            <BillingContext.Provider value={billing}>
                                <BillingSetterContext.Provider value={setBilling}>
                                    <CardsContext.Provider value={cards}>
                                        <CardsSetterContext.Provider value={setCards}>
                                            <PanelsContext.Provider value={panels}>
                                                <PanelsSetterContext.Provider value={setPanels}>
                                                    {currentStep}
                                                </PanelsSetterContext.Provider>
                                            </PanelsContext.Provider>
                                        </CardsSetterContext.Provider>
                                    </CardsContext.Provider>
                                </BillingSetterContext.Provider>
                            </BillingContext.Provider>
                        </InputSetterContext.Provider>
                    </InputContext.Provider>
                </fieldset> 
            </form>
        </section>
    )
}


export function NextButton({ handleClick, last = null }) {
    return (
        <button 
            className='main-section__next'
            onClick={handleClick}
        >{last ? "Confirm" : "Next Step"}</button>
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