import { useState, createContext } from 'react';
import Form from './Form';
import StepInfo from './StepInfo';

// contexts
export const StepContext = createContext(0);
export const StepSetterContext = createContext(null);

export default function App() {
  const [step, setStep] = useState(0);

  return (
    <main className='main'>
      <StepContext.Provider value={step}>
        <StepSetterContext.Provider value={setStep}>
          <StepInfo />
          <Form />
        </StepSetterContext.Provider>
      </StepContext.Provider>
    </main>
  )
}