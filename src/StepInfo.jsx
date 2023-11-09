import Step from "./Step";
import './StepInfo.scss';
import bgSidebar from './assets/images/bg-sidebar-desktop.svg';

export default function StepInfo() {
    return (
        <section className="step-info">
            <img
                className="step-info__bg" 
                src={bgSidebar} 
                alt=""
                role="presentation"
            />
            <Step 
                number={1}
                title="Step 1"
                heading="Your info"
            />
            <Step 
                number={2}
                title="Step 2"
                heading="Select plan"
            />
            <Step 
                number={3}
                title="Step 3"
                heading="Add-ons"
            />
            <Step 
                number={4}
                title="Step 4"
                heading="Summary"
            />
        </section>
    )
}
