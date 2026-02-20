import './App.css'

function App() {

  return (
    <div>
      <h1>hello React!</h1>
      <Pizza/>
      <Pizza/>
      <Pizza/>
    </div>
  )
}

function Pizza(){
  return <div>
    <img src='../public/pizzas/spinaci.jpg' alt='pizza'></img>
    <h2>Pizza Spinaci</h2>
    <p>Tomato, mozarella, spinach and ricotta cheese</p>
  </div>
}

export default App
