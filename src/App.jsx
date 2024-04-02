
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import VerifyLoginPage from './pages/VerifyLoginPage'
import CartListPage from './pages/CartListPage'
import ProductListPage from './pages/ProductListPage'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<ProductListPage/>}></Route>
      <Route path='/login' element={<LoginPage/>}></Route>
      <Route path='/verify' element={<VerifyLoginPage/>}></Route>
      <Route path='/cart-list' element={<CartListPage/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
