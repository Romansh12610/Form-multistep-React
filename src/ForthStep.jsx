import { useContext } from 'react';
import { NextButton, PrevButton } from './Form';
import { InputContext, BillingContext, CardsContext, PanelsContext, MakeChangesSetterContext, StepSetterContext, DesktopContext, ConfirmedContext, ConfirmedSetterContext } from './Contexts';
import './ForthStep.scss';
import thanksImg from './assets/images/icon-thank-you.svg';

export default function ForthStep() {

    //context
    const setStep = useContext(StepSetterContext);
    const formData = useContext(InputContext);
    const billing = useContext(BillingContext);
    const cards = useContext(CardsContext);
    const panels = useContext(PanelsContext);
    const setIsMakeChanges = useContext(MakeChangesSetterContext);
    const isDesktop = useContext(DesktopContext);
    const isConfirmed = useContext(ConfirmedContext);
    const setIsConfirmed = useContext(ConfirmedSetterContext);

    // event handlers
    function handleNextClick(e) {
        e.preventDefault();
        setIsConfirmed(true);
    }

    function handlePrevClick(e) {
        e.preventDefault();
        
        setStep(prevStep => prevStep - 1);
    }

    function handleMakeChangesClick(step) {
        setStep(step);
        setIsMakeChanges(true);
    }

    // to pass
    const formDataList = Object.values(formData);

    const { title: plan, monthPrice, yearPrice } = cards.find(card => card.chosen === true);
    const billingTitle = billing[0].toUpperCase() + billing.slice(1);
    const planBillingList = [ plan, billingTitle ];
    const planBillingPrice = billing == 'monthly' ? monthPrice : yearPrice;
    const planBillingPriceNumber = planBillingPrice.match(/\$(\d+)\//)[1];
    
    const chosenAddOns = panels.filter(p => p.chosen);
    const addOnsList = Array.from(chosenAddOns, addOn => addOn.title);
    const addOnsPriceNumber = billing == 'monthly' ? chosenAddOns.reduce((sum, current) => sum + current.priceNumber.month, 0) : chosenAddOns.reduce((sum, current) => sum + current.priceNumber.year, 0);
    const addOnsPriceRender = `+$${addOnsPriceNumber}/${billing == 'monthly' ? 'mo' : 'yr'}`;

    const totalPrice = `+$${Number(addOnsPriceNumber) + Number(planBillingPriceNumber)}/${billing == 'monthly' ? 'mo' : 'yr'}`;

    // rendering
    if (isConfirmed) {
        return (
            <section className='forth-step thanks-stage'>
                <img src={thanksImg} alt="" role='presentation' className='forth-step__thanks-img'/>
                <h3 className='forth-step__thanks-title'>Thank You!</h3>
                <p className='forth-step__thanks-subtitle'>Thanks for confirming your subscription! We hope you have some fun using our platform. If you ever need support please feel free to email us at support@loremgaming.com</p>
            </section>
        )
    }

    return (
        <>
            <section className='forth-step'>
                <h2 className='forth-step__h2'>Finishing up</h2>
                <p className='forth-step__p'>Double-check everything looks <span className='forth-step__span-OK'>ok</span> before confirming</p>
                <section className='forth-step__confirm-section'>
                    <ConfirmBlock 
                        title="Personal Data:"
                        list={formDataList}
                        name="personalData"
                        handleClick={handleMakeChangesClick}
                        step={0}
                    />
                    <ConfirmBlock 
                        title="Plan & Billing:"
                        list={planBillingList}
                        sumPrice={planBillingPrice}
                        name="planBilling"
                        handleClick={handleMakeChangesClick}
                        step={1}
                    />
                    <ConfirmBlock 
                        title="Add-ons:"
                        list={addOnsList}
                        sumPrice={addOnsPriceRender}
                        name="addOns"
                        handleClick={handleMakeChangesClick}
                        step={2}
                    />
                </section>
                <div className='forth-step__total'>
                    <h3 className='forth-step__total-title'>Total per {billing == 'monthly' ? 'month' : 'year'}:</h3>
                    <p className='forth-step__total-price'>{totalPrice}</p>
                </div>
            </section>
            {isDesktop && <NextButton 
                last={true}
                handleClick={handleNextClick}
                extended={true}
            />}
            {isDesktop && <PrevButton 
                handleClick={handlePrevClick}
                extended={true}
            />}
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
                >Make some changes on step №{step + 1}</a>
            </div>
            {sumPrice && <p className='forth-step__price'>{sumPrice}</p>}
        </div>
    )
}