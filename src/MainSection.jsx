import { useContext, useEffect, useState } from "react";
import StepInfo from './StepInfo';
import Form from './Form';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import ForthStep from './ForthStep';
import { NextButton, PrevButton } from "./Form";
import './GlobalLayout.scss';
import { DesktopContext, StepContext, MakeChangesContext, MakeChangesSetterContext, StepSetterContext, ConfirmedContext, ConfirmedSetterContext } from "./Contexts";

export default function MainSection() {

    // orientation manipulations
    const [isDesktop, setIsDesktop] = useState(
        window.matchMedia("(min-width: 651px)")
    );

    useEffect(() => {
        function handleChangeOrientation(e) {
            setIsDesktop(e.matches);
        }

        window.matchMedia("(min-width: 651px)")
            .addEventListener('change', handleChangeOrientation);

        return () => {
            window.removeEventListener('change', handleChangeOrientation);
        }
    }, []);

    // contexts
    const step = useContext(StepContext);
    const setStep = useContext(StepSetterContext);
    const isMakeChanges = useContext(MakeChangesContext);
    const setIsMakeChanges = useContext(MakeChangesSetterContext);
    const isConfirmed = useContext(ConfirmedContext);
    const setIsConfirmed = useContext(ConfirmedSetterContext);

    const currentStep = step === 0 ? (<FirstStep isMakingChanges={isMakeChanges ? true : false}/>)
            : step == 1 ? (<SecondStep  isMakingChanges={isMakeChanges ? true : false}/>)
            : step == 2 ? (<ThirdStep  isMakingChanges={isMakeChanges ? true : false}/>)
            : (<ForthStep />);

    console.log(step);
    
    // button handlers
    function handleFirstStep(e) {
        e.preventDefault();
        
        const inputs = document.querySelectorAll('.first-step__input');
        for (let input of inputs) {
            if (!input.validity.valid) {
                input.focus();
                return;
            }
        }

        setStep(prevStep => prevStep + 1);
        setIsMakeChanges(false);
    }

    function handleSecAndThirdStep(e) {
        e.preventDefault();

        setStep(prevStep => prevStep + 1);
        setIsMakeChanges(false);
    }

    function handleLastStep(e) {
        e.preventDefault();
        setIsConfirmed(true);
    }

    function handlePrevClick(e) {
        e.preventDefault();

       setStep(prevStep => prevStep - 1);
    }

    const finalHandlerNextFunction = step === 0 ? handleFirstStep
        : step === 1 | step === 2 ? handleSecAndThirdStep
        : handleLastStep;


    // rendering
    if (isDesktop === true) {
        return (
                <DesktopContext.Provider value={isDesktop}>
                    <main className="main">
                        <StepInfo />
                        <Form>
                            {currentStep}
                        </Form>
                    </main>
                </DesktopContext.Provider>
            )
    } else {
        return (
                <DesktopContext.Provider value={isDesktop}>
                    <StepInfo />
                    <main className="main">
                        <Form>
                            {currentStep}
                        </Form>
                    </main>
                    {!isConfirmed && (<footer className="footer">
                            {step > 0 && <PrevButton 
                                handleClick={handlePrevClick}
                            />}
                            <NextButton 
                                handleClick={finalHandlerNextFunction}
                                last={step === 3 ? true : false}
                            />
                        </footer>)}
                </DesktopContext.Provider>
            )
    }
}