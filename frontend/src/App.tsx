import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router'
import Products from './components/Products'
import Product from './components/Product'
function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Products />}/>
        <Route path='/:id' element={<Product />}/>
      </Routes>
    </Router>
  )
}

export default App
