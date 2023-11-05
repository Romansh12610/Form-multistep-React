import { useState } from 'react'
import Form from './Form';
import StepInfo from './StepInfo';

export default function App() {
  const [step, setStep] = useState(1);

  return (
    <main className='main'>
      <StepInfo />
      <Form step={step}/>
    </main>
  )
}