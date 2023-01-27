import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import HeroImage from '../sections/../../assets/hero-image.jpg'
import useAuth from '../../hooks/useAuth'

function Hero() {
  const { setLoginModal } = useContext(AppContext).authModal
  const { isAuth } = useAuth()
  return (
    <>
      <section className='min-h-56 flex justify-center items-center flex-1 shrink-0 bg-gray-100 overflow-hidden shadow-lg rounded-lg relative py-10 2xl:py-20 mx-2'>
        <img
          src={HeroImage}
          loading='lazy'
          alt='hero image'
          className='w-full h-full object-cover object-center absolute inset-0'
        />

        <div className='bg-indigo-500 mix-blend-multiply absolute inset-0'></div>
        <div className='sm:max-w-xl flex flex-col items-center relative p-4'>
          <p className='text-indigo-200 text-lg sm:text-xl text-center mb-4 md:mb-8 capitalize'>
            Welcome to our book store
          </p>
          <h1 className='text-white text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-8 md:mb-12'>
            Unique Books Await at Our Bookstore
          </h1>

          {!isAuth && (
            <div className='w-full flex flex-col sm:flex-row sm:justify-center gap-2.5'>
              <button
                onClick={() => setLoginModal(true)}
                className='inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3'
              >
                Login
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Hero
