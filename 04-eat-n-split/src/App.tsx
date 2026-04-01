import { useState } from 'react';
import './App.css'

const initialFriends = [
  {
    id: "118836",
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: "933372",
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: "499476",
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({children, onClick}: {children: React.ReactNode; onClick?: () => void}){
  return <button className='button' onClick={onClick}>{children}</button>
}

function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<friend | null>(null);

  function handleShowAddFriend(){
    setShowAddFriend(show => !show);
  }

  function handleAddFriend(friend: friend){
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend: friend){
    // setSelectedFriend(friend);
    setSelectedFriend((curr) => curr?.id === friend.id ? null : friend);
    setShowAddFriend(false);
  }

  function handleSplitBill(value: number | ""){
      setFriends(friends => 
        friends.map(friend => 
          friend.id === selectedFriend?.id
          ? {...friend, balance: friend.balance + Number(value)}
          : friend
        ) 
      );

      setSelectedFriend(null);
  }

  return <div className='app'>
    <div className='sidebar'>
      <FriendsList friends={friends} onSelection={handleSelection} selectedFriend={selectedFriend}/>

      {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
      <Button onClick={handleShowAddFriend}>{showAddFriend ? "Close" : "Add Friend" }</Button>
    </div>
    {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} onSplitBill={handleSplitBill} />}
  </div>
}
type friend = {
    id: string;
    name: string;
    image: string;
    balance: number;
}

type friendListProps = {
  friends: friend[];
  onSelection: (friend: friend) => void;
  selectedFriend: friend | null;
}

function FriendsList({friends, onSelection, selectedFriend}: friendListProps){
  return <ul>
    {friends.map(friend => (
      <Friend friend={friend} key={friend.id} onSelection={onSelection} selectedFriend={selectedFriend} />
    ))}
  </ul>
}


function Friend({friend, onSelection, selectedFriend}: {friend: friend, onSelection: (friend: friend) => void, selectedFriend: friend | null}){
  const isSelected = selectedFriend?.id === friend.id;
  return <li className={isSelected ? "selected" : ""} >
    <img src={friend.image} alt={friend.name} />
    <h3>{friend.name}</h3>
    {friend.balance < 0 && (
      <p className='red'>You owe {friend.name} {Math.abs(friend.balance)}€</p>
    )}
    {friend.balance > 0 && (
      <p className='green'> {friend.name} owe you {Math.abs(friend.balance)}€</p>
    )}
    {friend.balance === 0 && (
      <p>You and {friend.name} are even</p>
    )}
    <Button onClick={() => onSelection(friend)}>{isSelected ? "Close" : "Select"}</Button>
  </li>
}

type FormAddFriendProps = {
  onAddFriend: (friend: friend) => void;
};

function FormAddFriend({onAddFriend}: FormAddFriendProps) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    if(!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image : `${image}?=${id}`,
      balance: 0,
    }

    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className='form-add-friend' onSubmit={handleSubmit}>
      <label>🧑🏻‍🤝‍🧑🏻Friend name</label>
      <input type='text' value={name} onChange={e => setName(e.target.value)} />

      <label>🌄 Image URL</label>
      <input type='text' value={image} onChange={e => setImage(e.target.value)}/>
      <Button>Add</Button>
    </form>
  )
}

function FormSplitBill({selectedFriend, onSplitBill}: {selectedFriend: friend, onSplitBill: (value: number | "") => void}){
  const [bill, setBill] = useState<number | string>("");
  const [paidByUser, setPaidByUser] = useState<number | string>("");
  const paidByFriend = bill ? Number(bill) - Number(paidByUser) : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e:  React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    if(!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser)
  }

  return (
    <form className='form-split-bill' onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>💰 Bill value</label>
      <input type='text' value={bill} onChange={(e) => setBill(Number(e.target.value))} />

      <label>🕴️ Your expense</label>
      <input type='text' value={paidByUser} onChange={(e) => setPaidByUser(Number(e.target.value) > Number(bill) ?  paidByUser : Number(e.target.value))} />

      <label>🧑🏻‍🤝‍🧑🏻 {selectedFriend.name}'s expense</label>
      <input type='text' disabled value={paidByFriend} />
      <label>🤑 Who is paying the bill</label>
      <select value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <input type='text' />
      <Button>Split bill</Button>
    </form>
  )
}

export default App
