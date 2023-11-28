import { useEffect, useState } from "react";
import StepInfo from './StepInfo';
import Form from './Form';
import { StepContext, StepSetterContext, DesktopContext } from "./Contexts";
import { NextButton, PrevButton } from "./Form";
import './GlobalLayout.scss';

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

    if (isDesktop === true) {
        return (
            <StepContext.Provider value={step}>
                <StepSetterContext.Provider value={setStep}>
                    <DesktopContext.Provider value={isDesktop}>
                        <main className="main">
                            <StepInfo 
                                isDesktop={isDesktop}
                            />
                            <Form 
                                isDesktop={isDesktop}
                            />
                        </main>
                    </DesktopContext.Provider>
                </StepSetterContext.Provider>
            </StepContext.Provider>
        )
    } else {
        return (
            <StepContext.Provider value={step}>
                <StepSetterContext.Provider value={setStep}>
                    <DesktopContext.Provider value={isDesktop}>
                        <StepInfo 
                            isDesktop={isDesktop}
                        />
                        <main className="main">
                            <Form />
                        </main>
                        <footer className="footer">
                            <NextButton />
                            {step > 0 && <PrevButton />}
                        </footer>
                    </DesktopContext.Provider>
                </StepSetterContext.Provider>
            </StepContext.Provider>
        )
    }
}