import { useContext } from 'react';
import { StepContext } from './Contexts';
import Step from "./Step";
import './StepInfo.scss';
import sidebarDesktop from './assets/images/bg-sidebar-desktop.svg';
import sidebarMobile from './assets/images/bg-sidebar-mobile.svg';


export default function StepInfo({ isDesktop }) {
    const step = useContext(StepContext);

    return (
        <section className="step-info">
            <img
                className="step-info__bg" 
                src={isDesktop ? sidebarDesktop : sidebarMobile} 
                alt=""
                role="presentation"
            />
            <section className='step-info__wrapper'>
                <Step
                    step={step} 
                    number={1}
                    title="Step 1"
                    heading="Your info"
                />
                <Step
                    step={step} 
                    number={2}
                    title="Step 2"
                    heading="Select plan"
                />
                <Step
                    step={step}  
                    number={3}
                    title="Step 3"
                    heading="Add-ons"
                />
                <Step 
                    step={step}
                    number={4}
                    title="Step 4"
                    heading="Summary"
                />  
            </section>
        </section>
    )
}
