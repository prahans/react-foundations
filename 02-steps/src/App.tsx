import { useState } from 'react';
import './App.css'
import Counter from './Counter';
const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App(){
  return <div>
  <Steps/>
  <hr></hr>
  <Steps/>
  <hr></hr>
  <Counter/>
  </div>
}

function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious(){
    if(step > 1) setStep(s => s-1);
  }

  function handleNext(){
    if(step < 3) setStep(s => s+1);
  }

  return (
    <div>
    <button className='close' onClick={() => setIsOpen(is => !is)}>&times;</button>
    {isOpen && (
      <div className="steps">
      <div className="numbers">
        <div className={step >= 1 ? 'active' : ""}>1</div>
        <div className={step >= 2 ? 'active' : ""}>2</div>
        <div className={step >= 3 ? 'active' : ""}>3</div>
      </div>
      <StepMessage step={step} >{messages[step -1]}</StepMessage>
      <div className="buttons">
        <Button bgColor="#7950f2" textColor="#fff" onClick={handlePrevious}> <span>👈</span> Previous</Button>
        <Button bgColor="#7950f2" textColor="#fff" onClick={handleNext}> Next <span>👉</span></Button>
      </div>
    </div>
    )}
    </div>
  )
}

function StepMessage({step, children}: {step: number; children: React.ReactNode;}){
  return (<div className="message">
    <h3>Step {step} </h3> 
    {children}
   </div>)
}

type ButtonProps = {
  textColor: string;
  bgColor: string;
  onClick: () => void;
  children: React.ReactNode;
}

function Button({textColor, bgColor, onClick, children}: ButtonProps){
  return (
    <button style={{backgroundColor: bgColor, color: textColor}} onClick={onClick}>
      {children}
    </button>
  )
}

export default App
