import React from 'react'

export default function Register() {
  return (
    <div className='py-16 flex justify-center items-center'>
      <form className='max-w-sm w-full px-4 bg-blue-50 rounded-lg py-5 mx-3'>
        <div class='mb-6'>
          <label
            for='email'
            class='block mb-2 text-sm font-medium text-gray-900'
          >
            Your name
          </label>
          <input
            type='text'
            id='name'
            class='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none'
            placeholder='name@flowbite.com'
            required
          />
        </div>
        <div class='mb-6'>
          <label
            for='name'
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
          Register new account
        </button>
      </form>
    </div>
  )
}
