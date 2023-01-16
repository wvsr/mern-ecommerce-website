import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import HeroImage from '../assets/hero-image.jpg'

function Hero() {
  const { loginModal, setLoginModal } = useContext(AppContext).authModal
  return (
    <>
      <section class='min-h-56 flex justify-center items-center flex-1 shrink-0 bg-gray-100 overflow-hidden shadow-lg rounded-lg relative py-10 2xl:py-20'>
        <img
          src={HeroImage}
          loading='lazy'
          alt='Photo by Fakurian Design'
          class='w-full h-full object-cover object-center absolute inset-0'
        />

        <div class='bg-indigo-500 mix-blend-multiply absolute inset-0'></div>
        <div class='sm:max-w-xl flex flex-col items-center relative p-4'>
          <p class='text-indigo-200 text-lg sm:text-xl text-center mb-4 md:mb-8 capitalize'>
            Welcome to our book store
          </p>
          <h1 class='text-white text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-8 md:mb-12'>
            Unique Books Await at Our Bookstore
          </h1>

          <div class='w-full flex flex-col sm:flex-row sm:justify-center gap-2.5'>
            <button
              onClick={() => setLoginModal(true)}
              class='inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3'
            >
              Login
            </button>

            <a
              href='#'
              class='inline-block bg-gray-200 hover:bg-gray-300 focus-visible:ring ring-indigo-300 text-gray-500 active:text-gray-700 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3'
            >
              Trending
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero
