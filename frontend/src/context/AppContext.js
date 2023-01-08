import { createContext, useState } from 'react'
export const AppContext = createContext(null)

export function AppContextProvider(props) {
  const [user, setUser] = useState({})
  return (
    <AppContext.Provider
      value={{
        cart: [],
        user,
        setUser,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}
