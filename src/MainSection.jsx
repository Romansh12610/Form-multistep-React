import { useEffect, useState } from "react";
import StepInfo from './StepInfo';
import Form from './Form';
import { StepContext, StepSetterContext } from "./Contexts";


export default function MainSection() {
    const [step, setStep] = useState(0);
    const [isDesktop, setIsDesktop] = useState(
        window.matchMedia("(min-width: 651px)")
    );

    useEffect(() => {
        function handleChange(e) {
            setIsDesktop(e.matches);
        }

        window.matchMedia("(min-width: 651px)")
            .addEventListener('change', handleChange);

        return () => {
            window.removeEventListener('change', handleChange);
        }
    }, []);

    return (
        <main className='main'>
            <StepContext.Provider value={step}>
                <StepSetterContext.Provider value={setStep}>
                    <StepInfo 
                        isDesktop={isDesktop}
                    />
                    <Form />
                </StepSetterContext.Provider>
            </StepContext.Provider>
        </main>
    )
}