import { useContext, useEffect, useState } from "react";
import StepInfo from './StepInfo';
import Form from './Form';
import { NextButton, PrevButton } from "./Form";
import './GlobalLayout.scss';
import { DesktopContext, StepContext, InputContext, InputSetterContext } from "./Contexts";
import StepReducer from './ReducerStep';

export default function MainSection() {
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


    // contexts
    const step = useContext(StepContext);
    const formData = useContext(InputContext);
    const setFormData = useContext(InputSetterContext);

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        if (isMakingChanges) {
            if (timerId.current != null) {
                clearTimeout(timerId.current);
            }
            timerId.current = setTimeout(() => {
                showAcceptedChanges(e.target, name);
            }, 2000);

            setShowPopup(true);
        }
    }

    // rendering
    if (isDesktop === true) {
        return (
                <StepReducer>
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
                </StepReducer>
            )
    } else {
        return (
                <StepReducer>
                    <DesktopContext.Provider value={isDesktop}>
                        <StepInfo 
                            isDesktop={isDesktop}
                        />
                        <main className="main">
                            <Form />
                        </main>
                        <footer className="footer">
                            <NextButton 
                                handleClick={handleChange}
                            />
                            {step > 0 && <PrevButton />}
                        </footer>
                    </DesktopContext.Provider>
                </StepReducer>
            )
    }
}