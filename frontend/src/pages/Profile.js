import React, { useState } from 'react'
import axios from 'axios'
import ChangePassword from '../components/sections/ChangePassword'
import OrderHistory from '../components/sections/OrderHistory'
import DeleteAccaount from '../components/sections/DeleteAccaount'
function Profile() {
  return (
    <main className='container max-w-screen-lg mx-auto'>
      <DeleteAccaount />
      <ChangePassword />
      <OrderHistory />
    </main>
  )
}

export default Profile
