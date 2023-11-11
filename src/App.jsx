import { useState } from 'react'
import Form from './Form';
import StepInfo from './StepInfo';

export default function App() {
  const [step, setStep] = useState(0);
  const stepLength = 4;

  function handleStep(e) {
    e.preventDefault();
	  setStep(prevStep => (prevStep + 1) % stepLength);
  }   

  return (
    <main className='main'>
      <StepInfo step={step}/>
      <Form step={step} handleStep={handleStep}/>
    </main>
  )
}