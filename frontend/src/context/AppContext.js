import { createContext, useState } from 'react'
import AuthModal from '../components/AuthModal'

export const AppContext = createContext(null)

export function AppContextProvider(props) {
  const getUser = JSON.parse(localStorage.getItem('user'))
  console.log(getUser)
  const [user, setUser] = useState(getUser)
  const [loginModal, setLoginModal] = useState(false)
  // setUser(getUser)

  return (
    <AppContext.Provider
      value={{
        cart: [],
        auth: { user, setUser },
        authModal: { loginModal, setLoginModal },
      }}
    >
      {props.children}
      <AuthModal isOpen={loginModal} closeModal={setLoginModal} />
    </AppContext.Provider>
  )
}
