import './App.css'
import React, { useState } from 'react';

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Passports", quantity: 2, packed: false },
  { id: 4, description: "Socks", quantity: 12, packed: false },
  { id: 5, description: "Passports", quantity: 2, packed: true },
  { id: 6, description: "Socks", quantity: 12, packed: true },
];

function App() {
  return (<div className='app'>
  <Logo/>
  <Form/>
  <PackingList/>
  <Stats/>
  </div>)
}

function Logo(){
  return <h1>🌴 Far Away 💼</h1>
}
function Form(){
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    if(!description) return;
    const newItem = {description, quantity, packed: false, id: Date.now()}
    console.log(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😊 trip ?</h3>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num: number) => (
          <option value={num} key={num}>{num}</option>
        ))}
      </select>
      <input type='text' placeholder='Item...' value={description} onChange={e => setDescription(e.target.value)}/>
      <button>Add</button>
    </form>
  )
}
function PackingList(){
  return (
    <div className="list">
     <ul>
      {initialItems.map(item => (<Item item={item} key={item.id}/>))}
     </ul>
    </div>
  );
}
type ItemType = {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
};

function Item({item}: {item: ItemType}){
  return (
    <li>
      <span style={item.packed ? {textDecoration: "line-through"} : {}}>{item.description}, {item.quantity}</span>
      <button>❌</button>
    </li>
  );
}

function Stats(){
  return (
  <footer className='stats'>
    <em>
      you have X items on your list, and you already packed X (X%)
    </em>
  </footer>
  )
}
export default App
