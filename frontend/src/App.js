import { Route, Routes } from 'react-router-dom'

import Home from './components/Home'
import About from './components/About'
import Login from './components/Login'
import Register from './components/Register'
import NotFound from './components/NotFound'
import { AppContextProvider } from './context/AppContext'

export default function App() {
  return (
    <AppContextProvider>
      <Routes>
        <Route path='' component={<Home />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </AppContextProvider>
  )
}
