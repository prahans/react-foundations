import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Product from './pages/Product'
import Homepage from './pages/Homepage'
import Pricing from './pages/Pricing'
import PageNotFound from './pages/PageNotFount'

function App() {

  return (
    <BrowserRouter>
      <Routes>
         <Route path='/' element={<Homepage />} />
         <Route path='Product' element={<Product />} />
         <Route path='Pricing' element={<Pricing />} />
         <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
