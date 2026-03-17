import './App.css'
import React, { useState } from 'react';


type ItemType = {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
};

type FormProps = {
  onAddItems: (item: ItemType) => void;
};

type PackingListProps = {
  items: ItemType[];
  onDeleteItem: (id: number) => void;
  onToggleItem: (id: number) => void;
  onClearList: () => void;
};

type ItemListProps = {
  item: ItemType;
  onDeleteItem: (id: number) => void;
  onToggleItem: (id: number) => void;
}

function App() {
  const [items, setItems] = useState<ItemType[]>([]);
  function handleAddItems(item: ItemType) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id: number){
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id: number){
    setItems((items) => items.map((item) => item.id === id ? {...item, packed : !item.packed} : item ));
  }

  function handleClearList(){
    const confirmed = window.confirm("Are you sure you want to delete all items?");
    if(confirmed)
    setItems([]);
  }

  return (<div className='app'>
  <Logo/>
  <Form onAddItems={handleAddItems} />
  <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} onClearList={handleClearList} />
  <Stats items={items} />
  </div>)
}

function Logo(){
  return <h1>🌴 Far Away 💼</h1>
}
function Form({onAddItems}: FormProps){
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
function PackingList({ items, onDeleteItem, onToggleItem, onClearList }: PackingListProps){
  const [sortBy, setSortBy] = useState("input");
  let sortedItems: ItemType[] = items;
  if(sortBy === "input") sortedItems = items;
  if(sortBy === "description") sortedItems = items.slice().sort((a,b) => a.description.localeCompare(b.description));
  if(sortBy === "packed") sortedItems = items.slice().sort((a,b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
     <ul>
      {sortedItems.map(item => (<Item item={item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} key={item.id} />))}
     </ul>
     <div className='actions'>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value='input'>SORT BY INPUT ORDER</option>
        <option value="description">SORT BY DESCRIPTION</option>
        <option value="packed">SORT BY PACKED STATUS</option>
      </select>
      <button onClick={() => {onClearList()}}>Clear list</button>
     </div>
    </div>
  );
}



function Item({item, onDeleteItem, onToggleItem }: ItemListProps){
  return (
    <li>
      <input type='checkbox' checked={item.packed} onChange={() => onToggleItem(item.id)} />
      <span style={item.packed ? {textDecoration: "line-through"} : {}}>{item.quantity} {item.description} </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({items}: { items: ItemType[] }){
  if(!items.length)
    return (
    <p className='stats'>
      <em>Start adding some items to your packing list 🚀</em>
    </p>
  )

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100)
  return (
  <footer className='stats'>
    <em>
      {percentage === 100 ? "You got everything! Ready to go ✈️" :
      `you have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`
      }
    </em>
  </footer>
  )
}
export default App
