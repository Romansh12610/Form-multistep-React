import './ThirdStep.scss';
import { NextButton, PrevButton } from './Form';
import ConfirmChanges from './ConfirmChanges';
import { useContext, useState } from 'react';
import { StepSetterContext } from './App';
import { BillingContext, PanelsContext, PanelsSetterContext, ButtonDisableContext, ButtonSetterContext, MakeChangesSetterContext } from './Form';

export default function ThirdStep({ isMakingChanges }) {
    // context
    const setStep = useContext(StepSetterContext);
    const billing = useContext(BillingContext);
    const panels = useContext(PanelsContext);
    const setPanels = useContext(PanelsSetterContext);
    const buttonsDisable = useContext(ButtonDisableContext);
    const setButtonsDisable = useContext(ButtonSetterContext);
    const setIsMakeChanges = useContext(MakeChangesSetterContext);

    const [showPopup, setShowPopup] = useState(false);

    // event handlers
    function handlePanelClick(panelId) {    
        setPanels(panels.map((panel, id) => {
            if (id === panelId) {
                return {
                    ...panel,
                    chosen: !panel.chosen
                };
            } else {
                return panel;
            }
        }));

        if (isMakingChanges) {
            setShowPopup(true);
        }
    }

    function handleNextClick(e) {
        e.preventDefault();
        setStep(prevStep => prevStep + 1);
    }

    function handlePrevClick(e) {
        e.preventDefault();
        setStep(prevStep => prevStep - 1);
    }


    // panels to render
    const panelsArray = panels.map((panel, id) => (
        <Panel 
            key={id}
            title={panel.title}
            subTitle={panel.subtitle}
            panelId={id}
            handleClick={handlePanelClick}
            price={billing == 'monthly' ? panel.monthPrice : panel.yearPrice}
            chosen={panel.chosen}
        />
    ))


    return (
        <>
            <div className='third-step'>
                <h2 className='third-step__h2'>Pick add-ons</h2>
                <p className='third-step__p'>Add-ons help enhance your gaming experience.</p>
                <div className='third-step__option-section'>
                    {panelsArray}
                </div>
            </div>
            {showPopup && <ConfirmChanges
                setIsMakeChanges={setIsMakeChanges} 
                setShowPopup={setShowPopup}
                setButtonsDisable={setButtonsDisable}
            />}
            <NextButton 
                handleClick={handleNextClick}
                isDisabled={buttonsDisable}
            />
            <PrevButton 
                handleClick={handlePrevClick}
                isDisabled={buttonsDisable}
            />
        </>
        
    )
}


function Panel({ title, subTitle, price, panelId, handleClick, chosen }) {

    let panelClassName = 'third-step__panel';
    let checkMarkClassName = 'third-step__checkmark';
    if (chosen) {
        panelClassName += ' chosen';
        checkMarkClassName += ' chosen';
    }

    return (
        <div 
            className={panelClassName} 
            onClick={() => {
                handleClick(panelId)
            }
            }
        >
            <span className={checkMarkClassName}></span>
            <div className='third-step__title-wrapper'>
                <h4 className='third-step__title'>{title}</h4>
                <p className='third-step__sub-title'>{subTitle}</p>
            </div>
            <p className='third-step__price'>{price}</p>
        </div>
    )
}