import { StepSetterContext } from "./Contexts";
import arrowSvg from './assets/images/arrow-back.svg';
import './ConfirmChanges.scss';
import { useContext, useEffect, useRef, useState } from "react";

export default function ConfirmChanges({ setShowPopup, setIsMakeChanges, setButtonsDisable }) {
    // context & state
    const setStep = useContext(StepSetterContext);
    const [showThanks, setShowThanks] = useState(false);
    // ref
    const popupRef = useRef(null);
    const timeoutRef = useRef(null);

    // effect
    useEffect(() => {
        setTimeout(() => {
            popupRef.current.className += ' animate';
        }, 1500);
    }, []);

    // render code
    function handleConfirmClick() {
        setShowThanks(true);
        setButtonsDisable(true); 
        if (!timeoutRef.current) {
            timeoutRef.current = setTimeout(() => {
                setStep(3);
                setIsMakeChanges(false);
                setButtonsDisable(false);
                setShowPopup(false);
            }, 2500);
        }
    }

    return (
        <div aria-live="polite"
            className="confirm-popup"
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