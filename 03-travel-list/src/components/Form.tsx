import { useState } from "react";
import type { ItemType } from "./App";
export default function Form({onAddItems}: {onAddItems(item: ItemType): void}){
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  

  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    if(!description) return;
    const newItem = {description, quantity, packed: false, id: Date.now()}
    onAddItems(newItem);
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