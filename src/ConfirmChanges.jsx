import { StepSetterContext } from "./Contexts";
import arrowSvg from './assets/images/arrow-back.svg';
import './ConfirmChanges.scss';
import { useContext, useEffect, useRef, useState } from "react";

export default function ConfirmChanges({ setShowPopup, setIsMakeChanges, setButtonsDisable, isDisabled }) {
    // context & state
    const setStep = useContext(StepSetterContext);
    const [showThanks, setShowThanks] = useState(false);

    let textMessage = 'Accept changes and go back to the confirming step?';
    let popupClassName = "confirm-popup";

    if (isDisabled) {
        popupClassName += " disabled";
        textMessage = 'It seems, you need to correct something...';
    }

    // ref
    const popupRef = useRef(null);
    const timeoutRef = useRef(null);

    // effect
    useEffect(() => {
        setTimeout(() => {
            popupRef.current.classList.add('animate');
        }, 1500);

        return () => {
            if (popupRef.current.classList.contains('animate')) {
                popupRef.classList.remove('animate');
            }
        }
    }, [isDisabled]);

    // render code

    function handleConfirmClick() {
        if (isDisabled) {
            return;
        }

        setShowThanks(true);
        setButtonsDisable(true); 
        if (!timeoutRef.current) {
            timeoutRef.current = setTimeout(() => {
                setIsMakeChanges(false);
                setButtonsDisable(false);
                setShowPopup(false);
                setStep(3);
            }, 2500);
        }
    }

    return (
        <div aria-live="polite"
            className={popupClassName}
            onClick={handleConfirmClick}
            ref={popupRef}
            // accessibility
            role="popup"
            aria-describedby="warning"
        >
            <p id="warning" className="confirm-popup__p">
                {textMessage}
            </p>
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