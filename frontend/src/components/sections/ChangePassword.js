import React, { useState } from 'react'
import axios from 'axios'

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [errors, setErrors] = useState([])
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([])
    setSuccess(false)
    await axios.post('/user/change-password', {
      oldPassword,
      newPassword,
    })
    setSuccess(true)
    setOldPassword('')
    setNewPassword('')
    try {
    } catch (error) {
      setErrors(
        error?.response?.data?.errors || [{ msg: error.response.data?.message }]
      )
    }
  }

  return (
    <div className='space-y-3 max-w-lg px-3 py-4 shadow-sm bg-gray-50 border border-gray-200 rounded-lg '>
      <h2 className='text-lg my-2 text-gray-800'>Change your password</h2>
      <div className='space-y-3'>
        {errors &&
          errors.map((err, i) => (
            <div
              className='bg-red-300 rounded-lg text-red-900 w-full py-4 px-4 border border-red-500'
              key={i}
            >
              {err.msg}
            </div>
          ))}
        {success && (
          <div className='bg-green-300 rounded-lg text-green-900 w-full py-4 px-4 border border-green-500'>
            Password changed successfully
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className='space-y-3'>
        <input
          type='password'
          onChange={(e) => setOldPassword(e.target.value)}
          value={oldPassword}
          id='oldPassword'
          placeholder='Enter your old password'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none'
        />
        <input
          type='password'
          value={newPassword}
          id='newPassword'
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder='Enter new password'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none'
        />
        <button
          type='submit'
          className='focus:outline-none text-white bg-amber-500 hover:bg-amber-400 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
        >
          Change Password
        </button>
      </form>
    </div>
  )
}

export default ChangePassword
