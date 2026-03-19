import { useState } from "react";

const initialTask = ["eat", "cook", "code", "make projects"];

export default function TodoApp(){
    return (<div style={{height: "100vh", marginTop: "300px"}}>
        <InputSection/>
        <ShowTaskSection/>
        </div>
    )
}

function InputSection(){
    const [addTask, setAddTask] = useState("");

    function handleAddTask(addTask: string){
        console.log(addTask);
    }

    return (
        <div>
            <h1>Todo App</h1>
            <input type="text" value={addTask} onChange={(addTask) => setAddTask(addTask.target.value)} />
            <button onClick={() => handleAddTask(addTask)}>Add Task</button>
        </div>
    )
}

function Button({children}: {children: React.ReactNode;}){
    return <button>{children}</button>
}

function ShowTaskSection(){
    return (
        <ul>
            {initialTask.map(el => <li key={crypto.randomUUID()}>{el}  <Button>Delete</Button></li>)}
        </ul>
    )
}