import { useContext } from 'react';
import { NextButton, PrevButton, InputContext, BillingContext, CardsContext, PanelsContext } from './Form';
import { StepSetterContext } from './App';
import './ForthStep.scss';

export default function ForthStep() {
    //context
    const setStep = useContext(StepSetterContext);
    const formData = useContext(InputContext);
    const billing = useContext(BillingContext);
    const cards = useContext(CardsContext);
    const panels = useContext(PanelsContext);

    // event handlers
    function handleNextClick(e) {
        e.preventDefault();
    }

    function handlePrevClick(e) {
        e.preventDefault();
        setStep(s => s - 1);
    }

    function handleBackClick(step) {
        setStep(step);
    }

    // to pass
    const formDataList = Object.values(formData);

    const { title: plan, monthPrice, yearPrice } = cards.find(card => card.chosen === true);
    const billingTitle = billing[0].toUpperCase() + billing.slice(1);
    const planBillingList = [ plan, billingTitle ];
    const planBillingPrice = billing == 'monthly' ? monthPrice : yearPrice;
    
    const chosenAddOns = panels.filter(p => p.chosen);
    const addOnsList = Array.from(chosenAddOns, addOn => addOn.title);
    const addOnsPriceNumber = billing == 'monthly' ? chosenAddOns.reduce((sum, current) => sum + current.priceNumber.month, 0) : chosenAddOns.reduce((sum, current) => sum + current.priceNumber.year, 0);
    const addOnsPriceRender = `+$${addOnsPriceNumber}/${billing == 'monthly' ? 'mo' : 'yr'}`;

    return (
        <>
            <div className='forth-step'>
                <h2 className='forth-step__h2'>Finishing up</h2>
                <p className='forth-step__p'>Double-check everything looks <span className='forth-step__span-OK'>ok</span> before confirming</p>
                <section className='forth-step__confirm-section'>
                    <ConfirmBlock 
                        title="Personal Data:"
                        list={formDataList}
                        name="personalData"
                        handleClick={handleBackClick}
                        step={0}
                    />
                    <ConfirmBlock 
                        title="Plan & Billing:"
                        list={planBillingList}
                        sumPrice={planBillingPrice}
                        name="planBilling"
                        handleClick={handleBackClick}
                        step={1}
                    />
                    <ConfirmBlock 
                        title="Add-ons:"
                        list={addOnsList}
                        sumPrice={addOnsPriceRender}
                        name="addOns"
                        handleClick={handleBackClick}
                        step={2}
                    />
                </section>
            </div>
            <NextButton 
                last={true}
                handleClick={handleNextClick}
            />
            <PrevButton 
                handleClick={handlePrevClick}
            />
        </>
    )
}

function ConfirmBlock({ title, list, sumPrice, handleClick, step }) {

    return (
        <div className='forth-step__confirm-block'>
            <div className='forth-step__confirm-info'>
                <h4 className='forth-step__title'>{title}</h4>
                <ul className='forth-step__selected-list'>
                    {list.map((item, index) => (
                        <li key={index}>
                            {item}
                        </li>
                    ))}
                </ul>
                <a 
                    className='forth-step__anchor'
                    onClick={(e) => {
                        e.preventDefault();
                        handleClick(step);
                    }}
                >Make changes</a>
            </div>
            {sumPrice && <p className='forth-step__price'>{sumPrice}</p>}
        </div>
    )
}