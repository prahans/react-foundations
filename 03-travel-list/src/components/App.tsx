import './App.css';
import  { useState } from 'react';
import Logo from './Logo';
import Form from './Form';
import  PackingList  from './PackingList';
import Stats  from './Stats';


export type ItemType = {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
};

export type ItemListProps = {
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

export default App
