import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import Header from './components/Header'
import { AppContext, AppContextProvider } from './context/AppContext'
import ProductPage from './pages/ProductPage'
import Footer from './components/Footer'

export default function App() {
  return (
    <AppContextProvider>
      <Header />
      <Routes>
        <Route path='' element={<Home />} />
        <Route path='product/:id' element={<ProductPage />} />
        <Route path='register' element={<Register />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </AppContextProvider>
  )
}
