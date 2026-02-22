import { useState } from "react";
import "./Counter.css"
export default function Counter(){
    return <>
    <Steps name="Step"/>
    <Steps name="Count"/>
    </>
}

function Steps({name}: {name: string}){
    const [step, setStep] = useState(1);
    const date = new Date("june 21 2027");
    date.setDate(date.getDate() + step);
    return <div className="counterSteps">
        <button onClick={ () => setStep(step - 1)}>-</button>
        <h3>{name}: {step}</h3>
        <button onClick={ () => setStep(step + 1)}>+</button>
        <p>{date.toDateString()}</p>
    </div>
}