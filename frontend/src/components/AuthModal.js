import Model from './Modal'
import { Link } from 'react-router-dom'
import React from 'react'

function AuthModel(props) {
  return (
    <div>
      <Model {...props}>
        <form>
          <div class='mb-6'>
            <label
              for='email'
              class='block mb-2 text-sm font-medium text-gray-900'
            >
              Your email
            </label>
            <input
              type='email'
              id='email'
              class='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none'
              placeholder='name@flowbite.com'
              required
            />
          </div>
          <div class='mb-6'>
            <label
              for='password'
              class='block mb-2 text-sm font-medium text-gray-900'
            >
              Your password
            </label>
            <input
              type='password'
              id='password'
              class='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none'
              required
            />
          </div>

          <button
            type='submit'
            class='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Login
          </button>
          <p className='text-gray-600 mt-4 capitalize'>
            don't have a account{' '}
            <Link
              to='register'
              className='text-indigo-400'
              onClick={() => props.closeModal(false)}
            >
              register
            </Link>
          </p>
        </form>
      </Model>
    </div>
  )
}

export default AuthModel
