import { Route, Routes } from 'react-router-dom'
import axios from 'axios'
import { AppContext, AppContextProvider } from './context/AppContext'
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'

import Home from './pages/Home'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import ProductPage from './pages/ProductPage'
import CartList from './pages/CartList'
import Search from './pages/Search'
import Profile from './pages/Profile'
import Products from './pages/dashboard/Products'
import Header from './components/sections/Header'
import Footer from './components/sections/Footer'

axios.defaults.baseURL = 'http://localhost:5000/api/'
const token = JSON.parse(localStorage.getItem('user'))?.token
console.log(token)
if (token) {
  axios.defaults.headers.common['authorization'] = `Bearer ${token}`
}
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
        <Route
          path='profile'
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path='dashboard/product'
          element={
            <AdminRoute>
              <Products />
            </AdminRoute>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </AppContextProvider>
  )
}
