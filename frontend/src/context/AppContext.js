import { createContext, useState } from 'react'
import AuthModal from '../components/AuthModal'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

export const AppContext = createContext(null)

export function AppContextProvider(props) {
  const getUser = JSON.parse(localStorage.getItem('user'))
  const [user, setUser] = useState(getUser)
  const [loginModal, setLoginModal] = useState(false)
  // setUser(getUser)

  return (
    <AppContext.Provider
      value={{
        auth: { user, setUser },
        authModal: { loginModal, setLoginModal },
      }}
    >
      {props.children}
      <AuthModal isOpen={loginModal} closeModal={setLoginModal} />
      <ToastContainer />
    </AppContext.Provider>
  )
}
