import React, { useContext, useState } from 'react'
import Model from './Modal'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'

function AuthModel(props) {
  const { user, setUser } = useContext(AppContext).auth
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    setErrors([])
    setSuccess(false)
    e.preventDefault()
    try {
      const submitUser = await axios.post('/user/', {
        email,
        password,
      })
      setUser(user)
      setSuccess(true)
      setTimeout(() => props.closeModal(false), 2000)
      localStorage.setItem('user', JSON.stringify(submitUser?.data))
    } catch (error) {
      console.error(
        error?.response?.data?.errors || [{ msg: error.response.data?.message }]
      )
      setErrors(
        error?.response?.data?.errors || [{ msg: error.response.data?.message }]
      )
    }
  }

  return (
    <div>
      <Model {...props}>
        <form onSubmit={handleSubmit}>
          <div className='pt-1 pb-4 space-y-2'>
            {success && (
              <div className='bg-green-300 rounded-lg text-green-900 w-full py-4 px-4 border border-green-500'>
                Login successfully
              </div>
            )}
            {errors &&
              errors.map((err, i) => (
                <div
                  className='bg-red-300 rounded-lg text-red-900 w-full py-4 px-4 border border-red-500'
                  key={i}
                >
                  {err.msg}
                </div>
              ))}
          </div>
          <div className='mb-6'>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-900'
            >
              Your email:
            </label>
            <input
              type='email'
              id='email'
              className='shadow-sm bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none'
              placeholder='Write your email address'
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
              Your password:
            </label>
            <input
              type='password'
              id='password'
              className='shadow-sm bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          <button
            type='submit'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Login
          </button>
          <p className='text-gray-600 mt-4 capitalize'>
            don't have a account{' '}
            <Link
              to='register'
              className='text-indigo-400 bg-slate-100 rounded-full px-2 py-1 '
              onClick={() => props.closeModal(false)}
            >
              Register
            </Link>
          </p>
        </form>
      </Model>
    </div>
  )
}

export default AuthModel
