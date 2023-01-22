import { Route, Routes } from 'react-router-dom'
import axios from 'axios'
import { AppContext, AppContextProvider } from './context/AppContext'

import Home from './pages/Home'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import ProductPage from './pages/ProductPage'
import CartList from './pages/CartList'
import Search from './pages/Search'
import Header from './components/sections/Header'
import Footer from './components/sections/Footer'

axios.defaults.baseURL = 'http://localhost:5000/api/'

export default function App() {
  return (
    <AppContextProvider>
      <Header />
      <Routes>
        <Route path='' element={<Home />} />
        <Route path='product/:id' element={<ProductPage />} />
        <Route path='register' element={<Register />} />
        <Route path='cart' element={<CartList />} />
        <Route path='search' element={<Search />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </AppContextProvider>
  )
}
