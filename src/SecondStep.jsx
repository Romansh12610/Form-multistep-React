import { useState, useRef, useContext } from 'react';
import './SecondStep.scss';
import { NextButton, PrevButton } from './Form';
import ConfirmChanges from './ConfirmChanges';
import { BillingContext, BillingSetterContext, CardsContext, CardsSetterContext, MakeChangesSetterContext, ButtonDisableContext, ButtonSetterContext, StepSetterContext } from './Contexts';
import arcadeIcon from './assets/images/icon-arcade.svg';
import advancedIcon from './assets/images/icon-advanced.svg';
import proIcon from './assets/images/icon-pro.svg';

export default function SecondStep({ isMakingChanges }) {
    // contexts
    const setStep = useContext(StepSetterContext);
    const billing = useContext(BillingContext);
    const setBilling = useContext(BillingSetterContext);
    const cards = useContext(CardsContext);
    const setCards = useContext(CardsSetterContext);
    const buttonsDisable = useContext(ButtonDisableContext);
    const setButtonsDisable = useContext(ButtonSetterContext);

    //for popup
    const setIsMakeChanges = useContext(MakeChangesSetterContext);
    const [showPopup, setShowPopup] = useState(false);

    // button handlers
    function handleNextClick(e) {
        e.preventDefault();

        setStep(prevStep => prevStep + 1);
        setIsMakeChanges(false);
    }

    function handlePrevClick(e) {
        e.preventDefault();

        setStep(prevStep => prevStep - 1);
    }

    function handleCardClick(cardId) {
        setCards(cards.map((card, id) => {
            if (id == cardId) {
                return {
                    ...card,
                    chosen: true
                }
            } else {
                return {
                    ...card,
                    chosen: false
                }
            }
        }));

        if (isMakingChanges) {
            setShowPopup(true);
        }
    }

    const cardsArray = cards.map(card => (
        <Card
            key={card.id} 
            cardId={card.id}
            title={card.title}
            price={billing == 'monthly' ? card.monthPrice : card.yearPrice}
            srcImg={card.status == 'arcade' ? arcadeIcon 
                : card.status == 'advanced' ? advancedIcon
                : proIcon
            }
            handleClick={handleCardClick}
            chosen={card.chosen}
        />
    ))

    return (
        <>
        <div className='second-step'>
            <h2 className='second-step__h2'>Select your plan</h2>
            <p className='second-step__p'>You have the option of monthly or yearly billing.</p>
            <div className='second-step__card-section'>
                {cardsArray}
            </div>
            <Toggler
                billing={billing} 
                setBilling={setBilling}
                isMakingChanges={isMakingChanges}
                setPopup={setShowPopup}
            />
        </div>
        {showPopup && <ConfirmChanges 
            setShowPopup={setShowPopup} 
            setIsMakeChanges={setIsMakeChanges}
            setButtonsDisable={setButtonsDisable}
        />}
        <NextButton handleClick={handleNextClick} isDisabled={buttonsDisable}/>
        <PrevButton handleClick={handlePrevClick} isDisabled={buttonsDisable}/>
        </>
    )
}

function Card({ title, price, srcImg, handleClick, cardId, chosen}) {

    let cardClassName = 'second-step__card';
    if (chosen) {
        cardClassName += ' chosen';
    }

    return (
        <div className={cardClassName}
            id={cardId} 
            tabIndex={0}
            onClick={() => {
                handleClick(cardId);
            }}
        >
            <img src={srcImg} className='second-step__icon'/>
            <div className='second-step__wrapper'>
                <h4 className='second-step__h4'>{title}</h4>
                <p className='second-step__p'>{price}</p>
            </div>
        </div>
    )
}

const Toggler = ({ billing, setBilling, isMakingChanges, setPopup }) => {
    const buttonRef = useRef(null);
    
    let firstLabelClassName = billing == 'monthly' ? 'second-step__label chosen' : 'second-step__label';
    let lastLabelClassName = billing == 'yearly' ? 'second-step__label chosen' : 'second-step__label';
    let circleClassName = 'second-step__toggle-circle';
    let toggleClassName = 'second-step__toggle-button';
    if (billing == 'yearly') {
        circleClassName += ' pressed';
        toggleClassName += ' pressed';
    }
    
    const handleClick = (e) => {
        e.preventDefault();
        if (billing == 'monthly') {
            setBilling('yearly');
            buttonRef.current.setAttribute('aria-pressed', 'true');
        } else {
            setBilling('monthly');
            buttonRef.current.setAttribute('aria-pressed', 'false');
        }

        if (isMakingChanges) {
            setPopup(true);
        }
    }

    const handleLabelClick = (e) => {
        const target = e.target.closest('label');
        if (!target) return;

        setBilling(target.id);

        if (isMakingChanges) {
            setPopup(true);
        }
    }

    return (
        <div className='second-step__toggle-wrapper'>
            <label className={firstLabelClassName} 
                id="monthly"
                onClick={handleLabelClick}
            >Monthly</label>
            <button
                className={toggleClassName}
                onClick={handleClick}
                ref={buttonRef}
            >
                <span
                    className={circleClassName}
                ></span>
            </button>
            <label className={lastLabelClassName} 
                id="yearly"
                onClick={handleLabelClick}
            >Yearly</label>
        </div>
    )
}