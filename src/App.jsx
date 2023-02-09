import { ItemList } from "./components/ItemList"
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom"
import { ShoppingCart } from "./components/ShoppingCart"
import { NavBar } from "./components/NavBar"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"


function App() {


  return (
    <ShoppingCartProvider>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<ItemList/>}/>
          <Route path="/cart" element={<ShoppingCart/>}/>
        </Routes>
      </Router> 
    </ShoppingCartProvider>

  )
}

export default App
