import { StepSetterContext } from "./App";
import arrowSvg from './assets/images/arrow-back.svg';
import './ConfirmChanges.scss';
import { useContext, useEffect, useRef } from "react";

export default function ConfirmChanges({ setIsConfirm, isMakingChanges }) {
    //context
    const setStep = useContext(StepSetterContext);

    //refs
    const popupRef = useRef(null);
    const buttonPopupRef = useRef(null);

    useEffect(() => {
        popupRef.current.classList.add('animated');
        buttonPopupRef.current.classList.add('animated');
        return () => {
            popupRef.current.classList.remove('animated');
            buttonPopupRef.current.classList.remove('animated');
        }
    }, []);

    // handle confirm click
    let showThanks = false;
    function handleConfirmClick() {
        showThanks = true;
        setTimeout(() => {
            setStep(3);
            setIsConfirm(false);
            isMakingChanges(false);
        }, 2500);
    }

    return (
        <div aria-live="polite"
            className="confirm-popup"
            ref={popupRef}
        >
            <p className="confirm-popup__p">Accept changes and go back to the confirming step?</p>
            <button 
                className="confirm-popup__button"
                ref={buttonPopupRef}
                onClick={handleConfirmClick}
            >
                <img 
                    src={arrowSvg}
                    className="confirm-popup__img"
                />
            </button>
            {showThanks && <p className="confirm-popup__thanks">
                Thank you, for getting correct data to us!
            </p>}
        </div>
    )
}