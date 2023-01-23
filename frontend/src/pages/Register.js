import React, { useState, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const { user, setUser } = useContext(AppContext).auth
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([])
    setSuccess(false)

    try {
      const submitUser = await axios.post('/user/register', {
        name: userName,
        password,
        email,
      })
      setUser(user)

      localStorage.setItem('user', JSON.stringify(submitUser?.data))
      setSuccess(true)
      setTimeout(() => navigate('/'), 2000)
    } catch (error) {
      setErrors(
        error?.response?.data?.errors || [{ msg: error.response.data?.message }]
      )
    }
  }
  return (
    <div className='py-16 flex justify-center items-center'>
      <form
        className='max-w-sm w-full px-4 bg-blue-50 rounded-lg py-5 mx-3'
        onSubmit={handleSubmit}
      >
        <div className='pt-1 pb-4 space-y-2'>
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
              User Created
            </div>
          )}
        </div>
        <div className='mb-6'>
          <label
            htmlFor='email'
            className='block mb-2 text-sm font-medium text-gray-900'
          >
            Your name
          </label>
          <input
            type='text'
            id='name'
            className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none'
            placeholder='Your name'
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            required
          />
        </div>
        <div className='mb-6'>
          <label
            htmlFor='name'
            className='block mb-2 text-sm font-medium text-gray-900'
          >
            Your email
          </label>
          <input
            type='email'
            id='email'
            className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none'
            placeholder='name@gmail.com'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className='mb-6'>
          <label
            htmlFor='password'
            className='block mb-2 text-sm font-medium text-gray-900'
          >
            Your password
          </label>
          <input
            type='password'
            id='password'
            className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Register new account
        </button>
      </form>
    </div>
  )
}
