import { createContext, useState } from 'react'
import AuthModal from '../components/AuthModal'
export const AppContext = createContext(null)

export function AppContextProvider(props) {
  const [user, setUser] = useState({})
  const [loginModal, setLoginModal] = useState(false)
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
