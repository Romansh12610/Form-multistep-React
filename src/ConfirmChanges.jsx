import { StepSetterContext } from "./Contexts";
import arrowSvg from './assets/images/arrow-back.svg';
import './ConfirmChanges.scss';
import { useContext, useEffect, useRef, useState } from "react";

export default function ConfirmChanges({ setShowPopup, setIsMakeChanges, setButtonsDisable, isPopupDisabled, setIsInputsDisabled }) {
    // context & state
    const setStep = useContext(StepSetterContext);
    const [showThanks, setShowThanks] = useState(false);

    // ref
    const popupRef = useRef(null);
    const timeoutRef = useRef(null);

    // effect
    useEffect(() => {

        if (isPopupDisabled) {
            popupRef.current.classList.add('disabled');
        }
        else if (!isPopupDisabled && popupRef.current.classList.contains('disabled'))  {
            popupRef.current.classList.remove('disabled');
        }

        setTimeout(() => {
            if (popupRef.current.classList.contains('animate') == false) {
                popupRef.current.classList.add('animate');
            }
            
        }, 1500);

    }, [isPopupDisabled]);

    // render code

    function handleConfirmClick() {
        if (isPopupDisabled) {
            return;
        }

        setShowThanks(true);
        setButtonsDisable(true); 
        setIsInputsDisabled(true);
        if (!timeoutRef.current) {
            timeoutRef.current = setTimeout(() => {
                setIsMakeChanges(false);
                setButtonsDisable(false);
                setShowPopup(false);
                setIsInputsDisabled(false);
                setStep(3);
            }, 2500);
        }
    }

    return (
        <div aria-live="polite"
            className="confirm-popup"
            onClick={handleConfirmClick}
            ref={popupRef}
            // accessibility
            role="popup"
            aria-describedby="warning"
        >
            <p id="warning" className="confirm-popup__p">
                'Accept changes and go back to the confirming step?'
            </p>
            <img 
                src={arrowSvg}
                className="confirm-popup__img"
            />
            {showThanks && <p className="confirm-popup__thanks" aria-live="polite">
                Thank you, for getting correct data to us!
            </p>}
        </div>
    )
}