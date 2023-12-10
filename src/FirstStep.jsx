import { useRef, useContext, useEffect, useState } from 'react';
import './FirstStep.scss';
import { Error } from './Error';
import { InputContext, InputSetterContext, MakeChangesSetterContext, ButtonDisableContext, ButtonSetterContext, StepSetterContext, DesktopContext } from './Contexts';
import { NextButton } from './Form';
import ConfirmChanges from './ConfirmChanges';

export default function FirstStep({ isMakingChanges }) {
    // contexts
    const formData = useContext(InputContext);
    const setFormData = useContext(InputSetterContext);
    const setIsMakeChanges = useContext(MakeChangesSetterContext);
    const setStep = useContext(StepSetterContext);
    const setButtonsDisabled = useContext(ButtonSetterContext);
    const buttonsDisabled = useContext(ButtonDisableContext);
    const isDesktop = useContext(DesktopContext);

    // initial effect to show empty required fields
    useEffect(() => {
        for (const input of document.querySelectorAll('input')) {
            if (input.validity.valueMissing) {
                showError(input.name, 'valueMissing');
            }
        }
    }, []);

    // for popup
    const [showPopup, setShowPopup] = useState(false);
    const [isPopupDisabled, setIsPopupDisabled] = useState(false);

    const [isErrorNotWarns, setIsErrorNotWarns] = useState({
        name: false,
        email: false,
        phone: false,
    });

    // event handlers
    function showAcceptedChanges(name) {
        const textOfMessage = "Changes accepted! Hope you do not lie to us...";
        
        setErrorMessage(prevMessages => {
            return {
                ...prevMessages,
                [name]: textOfMessage
            }
        });

        setIsErrorNotWarns(prevWarns => {
            return {
                ...prevWarns,
                [name]: true
            }
        });
    }

    function handleChange({ target }) {
        const { name, value } = target;

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    // state for checking error message states
    const [errorMessage, setErrorMessage] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const [isErrorShowed, setIsErrorShowed] = useState({
        name: false,
        email: false,
        phone: false,
    });

    const [isInputsDisabled, setIsInputsDisabled] = useState(false);

    function handleInput(e, pattern) {
        const { value, name, validity, placeholder, minLength = '', maxLength = '' } = e.target;

        const isValidPattern = pattern.test(value);
        const isRequiredEmpty = validity.valueMissing;
        const isTooShort = validity.tooShort;
        const isTooLong = validity.tooLong;

        if (isRequiredEmpty) {
            showError(name, 'valueMissing');
            if (isMakingChanges) {
                setIsPopupDisabled(true);
            }
        }
        else if (!isValidPattern) {
            showError(name, 'pattern', placeholder);
            if (isMakingChanges) {
                setIsPopupDisabled(true);
            }
        } 
        else if (isTooShort) {
            showError(name, 'tooShort', placeholder, minLength);
            if (isMakingChanges) {
                setIsPopupDisabled(true);
            }
        }
        else if (isTooLong) {
            showError(name, 'tooLong', placeholder, maxLength);
            if (isMakingChanges) {
                setIsPopupDisabled(true);
            }
        } 
        else {
            hideError(name);
            setIsPopupDisabled(false);

            if (isMakingChanges) {
                showAcceptedChanges(name);
                if (!showPopup) {
                    setShowPopup(true);
                }
            }
        }
    }    

    // error manipulations

    function showError(targetName, reason, hint, expectedLength) {
        const errorName = targetName;
        const textOfMessage = 
            reason === 'pattern' ? 
                `You should enter data in correct format, ${hint}`
            : reason === 'valueMissing' ?
                `This is mandatory field, you can't ignore it`
            : reason === 'tooShort' ?x
                `Your input is too short, we expect minimum ${expectedLength} characters here`
            :   `Your input is too long, we epect maximum ${expectedLength} characters here`;
        
        setErrorMessage(prevMessage => {
            return {
                ...prevMessage,
                [errorName]: textOfMessage,
            }
        });
        setIsErrorShowed(prevIsErrorShowed => {
            return {
                ...prevIsErrorShowed,
                [targetName]: true,
            }
        });
        setIsErrorNotWarns(prevWarns => {
            return {
                ...prevWarns,
                [targetName]: false,
            }
        });
    }

    function hideError(targetName) {
        const errorName = targetName;

        setErrorMessage(prevMessage => {
            return {
                ...prevMessage,
                [errorName]: '',
            }
        });
        setIsErrorShowed(prevIsErrorShowed => {
            return {
                ...prevIsErrorShowed,
                [targetName]: false,
            }
        })
    }


    // step handling
    function handleFirstStep(e) {
        e.preventDefault();
        
        if (isErrorShowed.name) {
            const nameInput = document.getElementById('name');
            nameInput.focus();
            return;
        }
        else if (isErrorShowed.email) {
            const emailInput = document.getElementById('email');
            emailInput.focus();
            return;
        }
        else if (isErrorShowed.phone) {
            const phoneInput = document.getElementById('phone');
            phoneInput.focus();
            return;
        }
        
        setStep(prevStep => prevStep + 1);
        setIsMakeChanges(false);
    }

    return (
        <div className='first-step'>
            <h2 className='first-step__h2'>Personal info</h2>
            <p className='first-step__p'>
                Please provide your name, email address,
                and phone number
            </p>
            <FormField
                label='Name'
                id='name'
                type='text'
                handleChange={handleChange}
                handleInput={handleInput}
                formData={formData}
                placeHolder='e.g. Stephen King'
                pattern={/^([A-Z]{1}[a-z]+)\s([A-Z]{1}[a-z]+)$/}
                minLength='6'
                maxLength='25'
                required='required'
                isErrorShowed={isErrorShowed.name}
                isDisabled={isInputsDisabled}
            />
            <Error
                name='name'
                message={errorMessage.name}
                isNoWarning={isErrorNotWarns.name}
            />
            <FormField
                label='Email Address'
                id='email'
                type='email'
                handleChange={handleChange}
                handleInput={handleInput}
                formData={formData}
                placeHolder='e.g. stephenking@lorem.com'
                pattern={/^.+@[a-zA-Z]{4,8}\.[a-z]{2,5}$/}
                minLength='8'
                maxLength='25'
                required='required'
                isErrorShowed={isErrorShowed.email}
                isDisabled={isInputsDisabled}
            />
            <Error
                name='email'
                message={errorMessage.email}
                isNoWarning={isErrorNotWarns.email}
            />
            <FormField
                label='Phone Number'
                id='phone'
                type='tel'
                handleChange={handleChange}
                handleInput={handleInput}
                formData={formData}
                pattern={/^(\+7|8)\s?(\d{3}[\s-]?){2}(\d{2}[\s-]?){2}$/}
                placeHolder='e.g. +8 999-999-99-99'
                required='required'
                isErrorShowed={isErrorShowed.phone}
                isDisabled={isInputsDisabled}
            />
            <Error
                name='phone'
                message={errorMessage.phone}
                isNoWarning={isErrorNotWarns.phone}
            />
            {isDesktop && <NextButton 
                handleClick={handleFirstStep}
                isDisabled={buttonsDisabled}
            />}
            {showPopup && <ConfirmChanges
                isPopupDisabled={isPopupDisabled}
                setIsInputsDisabled={setIsInputsDisabled} 
                setShowPopup={setShowPopup} 
                setIsMakeChanges={setIsMakeChanges}
                setButtonsDisable={setButtonsDisabled}
            />}
        </div>
    )
}

const FormField = ({ label, id, type, handleChange, handleInput, formData, placeHolder, pattern, minLength, maxLength, required, isErrorShowed, isDisabled }) => { 

    let inputClassName = 'first-step__input';
    if (isErrorShowed) inputClassName += ' invalid';

    return (
        <>
            <label
                className='first-step__label' 
                htmlFor={id}
            >{label}</label>
            <input
                className={inputClassName} 
                type={type}
                id={id}
                name={id}
                value={formData?.[id]}
                onChange={handleChange}
                onInput={(e) => handleInput(e, pattern)}
                placeholder={placeHolder}
                minLength={minLength}
                maxLength={maxLength}
                required={required}
                disabled={isDisabled}
            />
        </>
    )
}