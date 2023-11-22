import { useState, createContext } from 'react';
import Form from './Form';
import StepInfo from './StepInfo';

// contexts creation
export const StepContext = createContext(0);
export const StepSetterContext = createContext(null);

export default function App() {
  const [step, setStep] = useState(0);
  const [mobile, setMobile] = useState(false);

  if (window.innerWidth < 850 && mobile === false) {
    console.log('mobile');
    setMobile(true);
  }

  if (window.innerWidth > 850 && mobile === true) {
    console.log('desktop');
    setMobile(false);
  }

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