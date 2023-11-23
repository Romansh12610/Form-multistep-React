import { useContext } from 'react';
import { StepContext } from './App';
import Step from "./Step";
import './StepInfo.scss';
import sidebarDesktop from './assets/images/bg-sidebar-desktop.svg';


export default function StepInfo({ sideBarImg }) {
    const step = useContext(StepContext);

    return (
        <section className="step-info">
            <img
                className="step-info__bg" 
                src={sidebarDesktop} 
                alt=""
                role="presentation"
            />
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
    )
}
