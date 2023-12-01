import { useState } from "react";
import { InputContext, InputSetterContext, BillingContext, BillingSetterContext, CardsContext, CardsSetterContext, PanelsContext, PanelsSetterContext, MakeChangesContext, MakeChangesSetterContext, ButtonDisableContext, ButtonSetterContext, StepContext, StepSetterContext, ConfirmedContext, ConfirmedSetterContext } from './Contexts';

export default function ContextProvider({ children }) {
    const [step, setStep] = useState(0);
    const [isMakeChanges, setIsMakeChanges] = useState(false);
    const [buttonsDisable, setButtonsDisable] = useState(false);
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
            monthPrice: "$9/mo",
            yearPrice: "$90/yr",
            chosen: true
        },
        {
            id: 1,
            status: "advanced",
            title: "Advanced",
            monthPrice: "$12/mo",
            yearPrice: "$120/yr",
            chosen: false
        },
        {
            id: 2,
            status: "pro",
            title: "Pro",
            monthPrice: "$15/mo",
            yearPrice: "$150/yr",
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

    const [isConfirmed, setIsConfirmed] = useState(false);

    return (
        <StepContext.Provider value={step}>
            <StepSetterContext.Provider value={setStep}>
                <InputContext.Provider value={formData}>
                    <InputSetterContext.Provider value={setFormData}>
                        <ButtonDisableContext.Provider value={buttonsDisable}>
                            <ButtonSetterContext.Provider value={setButtonsDisable}>
                                <BillingContext.Provider value={billing}>
                                    <BillingSetterContext.Provider value={setBilling}>
                                        <CardsContext.Provider value={cards}>
                                            <CardsSetterContext.Provider value={setCards}>
                                                <PanelsContext.Provider value={panels}>
                                                    <PanelsSetterContext.Provider value={setPanels}>
                                                        <MakeChangesContext.Provider value={isMakeChanges}>
                                                            <MakeChangesSetterContext.Provider value={setIsMakeChanges}>
                                                                <ConfirmedContext.Provider value={isConfirmed}>
                                                                    <ConfirmedSetterContext.Provider value={setIsConfirmed}>
                                                                        {children}
                                                                    </ConfirmedSetterContext.Provider>
                                                                </ConfirmedContext.Provider>
                                                            </MakeChangesSetterContext.Provider>
                                                        </MakeChangesContext.Provider>
                                                    </PanelsSetterContext.Provider>
                                                </PanelsContext.Provider>
                                            </CardsSetterContext.Provider>
                                        </CardsContext.Provider>
                                    </BillingSetterContext.Provider>
                                </BillingContext.Provider>
                            </ButtonSetterContext.Provider>
                        </ButtonDisableContext.Provider>
                    </InputSetterContext.Provider>
                </InputContext.Provider>
            </StepSetterContext.Provider>
        </StepContext.Provider>
    )
}