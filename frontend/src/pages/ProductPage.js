import React, { useContext } from 'react'
import ProductCard from '../components/ProductCard'
import { useFetch } from '../hooks/fetchData'
import { AiFillStar, AiOutlineShoppingCart } from 'react-icons/ai'
import { MdLocalShipping } from 'react-icons/md'
import { AppContext } from '../context/AppContext'
export default function ProductPage() {
  const { loginModal, setLoginModal } = useContext(AppContext).authModal
  const {
    data: recomendedProduct,
    isLoading,
    error,
  } = useFetch('https://dummyjson.com/products')

  const PrdouctReview = () => {
    return (
      <>
        <div class='flex flex-col gap-3 py-4 md:py-8'>
          <div>
            <span class='block text-sm font-bold'>John McCulling</span>
            <span class='block text-gray-500 text-sm'>August 28, 2021</span>
          </div>

          <div class='flex gap-0.5 -ml-1'>
            <AiFillStar className='w-5 h-5 text-yellow-400' />
            <AiFillStar className='w-5 h-5 text-yellow-400' />
            <AiFillStar className='w-5 h-5 text-yellow-400' />
            <AiFillStar className='w-5 h-5 text-yellow-400' />
            <AiFillStar className='w-5 h-5 text-yellow-400' />
          </div>

          <p class='text-gray-600'>
            This is a section of some simple filler text, also known as
            placeholder text. It shares some characteristics of a real written
            text but is random or otherwise generated. It may be used to display
            a sample of fonts or generate text for testing.
          </p>
        </div>
      </>
    )
  }

  return (
    <>
      <div class='bg-white py-6 sm:py-8 lg:py-12'>
        <div class='max-w-screen-lg px-4 md:px-8 mx-auto'>
          <div class='grid md:grid-cols-2 gap-8'>
            <div class='space-y-4'>
              <div class='bg-gray-100 rounded-lg overflow-hidden relative'>
                <img
                  src='https://images.unsplash.com/flagged/photo-1571366992942-be878c7b10c0?auto=format&q=75&fit=crop&w=600'
                  loading='lazy'
                  alt='Photo by Himanshu Dewangan'
                  class='w-full h-full object-cover object-center'
                />

                <span class='bg-red-500 text-white text-sm tracking-wider uppercase rounded-br-lg absolute left-0 top-0 px-3 py-1.5'>
                  sale
                </span>
              </div>
              
            </div>
            <div class='md:py-8'>
              <div class='mb-2 md:mb-3'>
                <span class='inline-block text-gray-500 mb-0.5'>
                  Fancy Brand
                </span>
                <h2 class='text-gray-800 text-2xl lg:text-3xl font-bold'>
                  Pullover with pattern
                </h2>
              </div>
              <div class='flex items-center mb-6 md:mb-10'>
                <div class='flex gap-0.5 -ml-1'>
                  <AiFillStar className='w-6 h-6 text-yellow-400' />
                  <AiFillStar className='w-6 h-6 text-yellow-400' />
                  <AiFillStar className='w-6 h-6 text-yellow-400' />
                  <AiFillStar className='w-6 h-6 text-yellow-400' />
                  <AiFillStar className='w-6 h-6 text-yellow-400' />
                </div>

                <span class='text-gray-500 text-sm ml-2'>4.2</span>

                <a
                  href='#'
                  class='text-indigo-500 hover:text-indigo-600 active:text-indigo-700 text-sm font-semibold transition duration-100 ml-4'
                >
                  view all 47 reviews
                </a>
              </div>

              <div class='mb-4'>
                <div class='flex items-end gap-2'>
                  <span class='text-gray-800 text-xl md:text-2xl font-bold'>
                    $15.00
                  </span>
                  <span class='text-red-500 line-through mb-0.5'>$30.00</span>
                </div>

                <span class='text-gray-500 text-sm'>
                  incl. VAT plus shipping
                </span>
              </div>
              <div class='flex items-center text-gray-500 gap-2 mb-6'>
                <MdLocalShipping />
                <span class='text-sm'>2-4 day shipping</span>
              </div>
              <div class='flex md:block gap-2.5 md:space-y-5'>
                <button
                  onClick={() => setLoginModal(true)}
                  href='#'
                  class='inline-block w-full flex-1 sm:flex-none bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3'
                >
                  Buy Now
                </button>

                <a
                  href='#'
                  class='inline-flex w-full justify-center items-center gap-2 bg-gray-200 hover:bg-gray-300 focus-visible:ring ring-indigo-300 text-gray-500 active:text-gray-700 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-4 py-3'
                >
                  <AiOutlineShoppingCart className='text-2xl' /> Add To Cart
                </a>
              </div>
            </div>
          </div>

          {/* description  */}
          <div class='mt-10 md:mt-16 lg:mt-20'>
            <div class='text-gray-800 text-lg font-semibold mb-3'>
              Description
            </div>

            <p class='text-gray-500'>
              This is a section of some simple filler text, also known as
              placeholder text. It shares some characteristics of a real written
              text but is random or otherwise generated. It may be used to
              display a sample of fonts or generate text for testing.
              <br />
              <br />
              This is a section of some simple filler text, also known as
              placeholder text. It shares some characteristics of a real written
              text but is random or otherwise generated.
            </p>
          </div>
        </div>

        {/* product reviews  */}
        <div className='mt-24'>
          <div class='max-w-screen-xl px-4 md:px-8 mx-auto'>
            <div class='grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12'>
              <div>
                <div class='border rounded-lg p-4'>
                  <h2 class='text-gray-800 text-lg lg:text-xl font-bold mb-3'>
                    Customer Reviews
                  </h2>

                  <div class='flex items-center gap-2 mb-0.5'>
                    <div class='flex gap-0.5 -ml-1'>
                      <AiFillStar className='w-6 h-6 text-yellow-400' />
                      <AiFillStar className='w-6 h-6 text-yellow-400' />
                      <AiFillStar className='w-6 h-6 text-yellow-400' />
                      <AiFillStar className='w-6 h-6 text-yellow-400' />
                      <AiFillStar className='w-6 h-6 text-yellow-400' />
                    </div>

                    <span class='text-sm font-semibold'>4/5</span>
                  </div>

                  <span class='block text-gray-500 text-sm'>
                    Bases on 27 reviews
                  </span>

                  <div class='flex flex-col border-t border-b gap-2 py-5 my-5'>
                    <div class='flex items-center gap-3'>
                      <span class='w-10 text-gray-600 text-sm text-right whitespace-nowrap'>
                        5 Star
                      </span>

                      <div class='h-4 flex flex-1 bg-gray-200 overflow-hidden rounded'>
                        <span class='w-3/4 h-full bg-yellow-400 rounded'></span>
                      </div>
                    </div>
                    <div class='flex items-center gap-3'>
                      <span class='w-10 text-gray-600 text-sm text-right whitespace-nowrap'>
                        4 Star
                      </span>

                      <div class='h-4 flex flex-1 bg-gray-200 overflow-hidden rounded'>
                        <span class='w-1/2 h-full bg-yellow-400 rounded'></span>
                      </div>
                    </div>
                    <div class='flex items-center gap-3'>
                      <span class='w-10 text-gray-600 text-sm text-right whitespace-nowrap'>
                        3 Star
                      </span>

                      <div class='h-4 flex flex-1 bg-gray-200 overflow-hidden rounded'>
                        <span class='w-1/6 h-full bg-yellow-400 rounded'></span>
                      </div>
                    </div>
                    <div class='flex items-center gap-3'>
                      <span class='w-10 text-gray-600 text-sm text-right whitespace-nowrap'>
                        2 Star
                      </span>

                      <div class='h-4 flex flex-1 bg-gray-200 overflow-hidden rounded'>
                        <span class='w-1/4 h-full bg-yellow-400 rounded'></span>
                      </div>
                    </div>
                    <div class='flex items-center gap-3'>
                      <span class='w-10 text-gray-600 text-sm text-right whitespace-nowrap'>
                        1 Star
                      </span>

                      <div class='h-4 flex flex-1 bg-gray-200 overflow-hidden rounded'>
                        <span class='w-1/12 h-full bg-yellow-400 rounded'></span>
                      </div>
                    </div>
                  </div>

                  <a
                    href='#'
                    class='block bg-white hover:bg-gray-100 active:bg-gray-200 focus-visible:ring ring-indigo-300 border text-gray-500 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-4 md:px-8 py-2 md:py-3'
                  >
                    Write a review
                  </a>
                </div>
              </div>
              <div class='lg:col-span-2'>
                <div class='border-b pb-4 md:pb-6'>
                  <h2 class='text-gray-800 text-lg lg:text-xl font-bold'>
                    Top Reviews
                  </h2>
                </div>

                <div class='divide-y'>
                  <PrdouctReview />
                </div>

                <div class='border-t pt-6'>
                  <a
                    href='#'
                    class='flex items-center text-indigo-400 hover:text-indigo-500 active:text-indigo-600 font-semibold transition duration-100 gap-0.5'
                  >
                    Read all reviews
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
