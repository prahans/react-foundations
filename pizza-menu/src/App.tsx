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
       <h1 style={{}}>Fast React Pizza Co.</h1>
    </header>)
}

function Menu(){
  const pizzas = pizzaData;
  const numPizzas = pizzas.length;
  return <main className='menu'>
    <h2>Our menu</h2>
    {numPizzas > 0 && (
      <ul className='pizzas'>
      {
        pizzaData.map((pizza) => (
          <Pizza pizzaObj={pizza} key={pizza.name}/>
        ))
      }
    </ul>
    )}
  </main>
}


function Pizza(props: {pizzaObj: {photoName: string, name: string, ingredients: string, price: number, soldOut: boolean}}){
  console.log(props)
  return <li className='pizza'>
    <img src={props.pizzaObj.photoName} alt='pizza'></img>
    <h3>{props.pizzaObj.name}</h3>
    <p>{props.pizzaObj.ingredients}</p>
    <span>{props.pizzaObj.price}</span>
  </li>
}

function Footer(){
  const hour = new Date().getHours();
  const openHr = 8;
  const closeHr = 22;
  const isOpen = hour >= openHr && hour <= closeHr;
  return (
  <footer className='footer'>
    {isOpen && (
      <div className="order">
        <p>
          We're open until {closeHr}:00. Come visit us or order
        </p>
        <button className="btn">Order</button>
      </div>
    )}
  </footer>
  )
}

export default App
