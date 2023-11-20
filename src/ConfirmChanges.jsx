import { StepSetterContext } from "./App";
import arrowSvg from './assets/images/arrow-back.svg';
import './ConfirmChanges.scss';
import { useContext, useRef, useState } from "react";

export default function ConfirmChanges({ className, setIsConfirm, setIsMakeChanges }) {
    // context & state
    const setStep = useContext(StepSetterContext);
    const [showThanks, setShowThanks] = useState(false);
    // ref
    const popupRef = useRef(null);
    // render code
    function handleConfirmClick() {
        setShowThanks(true); 
        setTimeout(() => {
            setStep(3);
            setIsMakeChanges(false);
            setIsConfirm(false);
        }, 2500);
    }

    return (
        <div aria-live="polite"
            className={className}
            onClick={handleConfirmClick}
            ref={popupRef}
        >
            <p className="confirm-popup__p">Accept changes and go back to the confirming step?</p>
            <img 
                src={arrowSvg}
                className="confirm-popup__img"
            />
            {showThanks && <p className="confirm-popup__thanks">
                Thank you, for getting correct data to us!
            </p>}
        </div>
    )
}