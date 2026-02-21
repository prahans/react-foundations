import './App.css'

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];


function App() {

  return (
    <div>
      <Header/>
      <Menu/>
      <Footer/>
    </div>
  )
}

function Header(){
  // const style = {color: "red", fontSize: "48px", textTransform: "uppercase"}
  return (<header className='header'>
       <h1>Fast React Pizza Co.</h1>
    </header>)
}


function Menu(){
  const pizzas = pizzaData;
  const numPizzas = pizzas.length;
  return <main className='menu'>
    <h2>Our menu</h2>
    {numPizzas > 0 ? (
      <>
      <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
      </p>
      <ul className='pizzas'>
      {
        pizzaData.map((pizza) => (
          <Pizza pizzaObj={pizza} key={pizza.name}/>
        ))
      }
    </ul> 
    </>)
    : <p>We're still working on our menu. Please come back later :)</p>
    }
  </main>
}

type PizzaType = {
  pizzaObj: {
    photoName: string,
   name: string,
  ingredients: string,
  price: number,
  soldOut: boolean
  }
}

function Pizza({pizzaObj:{photoName, name, ingredients, price, soldOut}}: PizzaType){
  return <li className={`pizza ${soldOut && "sold-out"}`}>
    <img src={photoName} alt='pizza'></img>
    <div>
    <h3>{name}</h3>
    <p>{ingredients}</p>
    <span>{soldOut ? "SOLD OUT" : price}</span>
    </div>
  </li>
}

function Footer(){
  const hour = new Date().getHours();
  const openHr = 8;
  const closeHr = 22;
  const isOpen = hour >= openHr && hour <= closeHr;
  return (
  <footer className='footer'>
    {isOpen ? (
      <Order closeHr={closeHr} openHr={openHr}/>
    ) : (
      <p>We're happy to welcome you between {openHr}:00 and {closeHr}:00.</p>
    )}
  </footer>
  )
}

function Order({closeHr, openHr}: {closeHr: number, openHr: number}){
  return (
    <div className="order">
        <p>
          We're open from {openHr}:00 to {closeHr}:00. Come visit us or order
        </p>
        <button className="btn">Order</button>
      </div>
  )
}

export default App
