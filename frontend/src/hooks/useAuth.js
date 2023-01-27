import { useEffect, useContext } from 'react'
import { AppContext } from '../context/AppContext'

const useAuth = (e) => {
  const { user, setUser } = useContext(AppContext).auth
  const isAuth = user?.token ? true : false
  const isAdmin = user?.isAdmin || false
  return { isAuth, user, setUser, isAdmin }
}

export default useAuth
