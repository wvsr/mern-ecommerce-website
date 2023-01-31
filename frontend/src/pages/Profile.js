import React, { useState, useContext } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import ChangePassword from '../components/sections/ChangePassword'
import OrderHistory from '../components/sections/OrderHistory'
import DeleteAccaount from '../components/sections/DeleteAccaount'
function Profile() {
  const { user, setUser } = useContext(AppContext).auth
  const logout = () => {
    setUser({})
    localStorage.setItem('user', null)
  }
  return (
    <main className='container max-w-screen-lg mx-auto'>
      <DeleteAccaount />
      <ChangePassword />
      <OrderHistory />
      <div className='max-w-lg rounded-lg border border-gray-300 py-2 px-2'>
        <p className='text-base text-gray-500 py-4'>want to logout?</p>
        <button
          type='button'
          className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
        >
          Log Out
        </button>
      </div>
    </main>
  )
}

export default Profile
