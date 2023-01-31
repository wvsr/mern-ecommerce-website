import React, { useContext, useEffect } from 'react'
import { useFetch } from '../hooks/fetchData'
import { AppContext } from '../context/AppContext'
import useAuth from '../hooks/useAuth'
import { useParams, useNavigate, Link } from 'react-router-dom'
//icons
import { AiFillStar, AiOutlineShoppingCart } from 'react-icons/ai'
import { MdLocalShipping } from 'react-icons/md'
import { toast } from 'react-toastify'

export default function ProductPage() {
  const navigate = useNavigate()
  const { setLoginModal } = useContext(AppContext).authModal
  const { id } = useParams()
  const { data, isLoading, error } = useFetch(`/product/${id}`)
  const { isAuth } = useAuth()
  console.log(data)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  function addToCart() {
    let products = []
    if (localStorage.getItem('products') && data._id) {
      products = JSON.parse(localStorage.getItem('products'))
    }
    const product = products.find((e) => e._id === data._id)
    if (product) {
      products = products.filter((e) => e._id !== data._id)
      products.push({ ...product, quantity: product.quantity + 1 })
    } else {
      products.push({
        _id: data?._id,
        poster: data?.poster,
        title: data?.title,
        price: data?.price,
        quantity: 1,
      })
    }
    localStorage.setItem('products', JSON.stringify(products))
    toast('Product added to the cart')
  }

  if (error) return navigate('')
  const PrdouctReview = () => {
    return (
      <>
        <div className='flex flex-col gap-3 py-4 md:py-8'>
          <div>
            <span className='block text-sm font-bold'>John McCulling</span>
            <span className='block text-gray-500 text-sm'>August 28, 2021</span>
          </div>

          <div className='flex gap-0.5 -ml-1'>
            <AiFillStar className='w-5 h-5 text-yellow-400' />
            <AiFillStar className='w-5 h-5 text-yellow-400' />
            <AiFillStar className='w-5 h-5 text-yellow-400' />
            <AiFillStar className='w-5 h-5 text-yellow-400' />
            <AiFillStar className='w-5 h-5 text-yellow-400' />
          </div>

          <p className='text-gray-600'>
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
      {isLoading && <h1 className='text-2xl'>Loading</h1>}
      {!isLoading && (
        <>
          <div className='bg-white py-6 sm:py-8 lg:py-12'>
            <div className='max-w-screen-lg px-4 md:px-8 mx-auto'>
              <div className='grid md:grid-cols-2 gap-8'>
                <div className='space-y-4'>
                  <div className='bg-gray-100 rounded-lg overflow-hidden relative'>
                    <img
                      src={data?.poster}
                      loading='lazy'
                      alt='Photo by Himanshu Dewangan'
                      className='w-full h-full object-cover object-center'
                    />

                    <span className='bg-red-500 text-white text-sm tracking-wider uppercase rounded-br-lg absolute left-0 top-0 px-3 py-1.5'>
                      sale
                    </span>
                  </div>
                </div>
                <div className='md:py-8'>
                  <div className='mb-2 md:mb-3'>
                    <span className='inline-block text-gray-500 mb-0.5'>
                      Fancy Brand
                    </span>
                    <h2 className='text-gray-800 text-2xl lg:text-3xl font-bold'>
                      {data?.title}
                    </h2>
                  </div>
                  <div className='flex items-center mb-6 md:mb-10'>
                    <div className='flex gap-0.5 -ml-1'>
                      <AiFillStar className='w-6 h-6 text-yellow-400' />
                      <AiFillStar className='w-6 h-6 text-yellow-400' />
                      <AiFillStar className='w-6 h-6 text-yellow-400' />
                      <AiFillStar className='w-6 h-6 text-yellow-400' />
                      <AiFillStar className='w-6 h-6 text-yellow-400' />
                    </div>

                    <span className='text-gray-500 text-sm ml-2'>
                      {data.star}
                    </span>
                  </div>

                  <div className='mb-4'>
                    <div className='flex items-end gap-2'>
                      <span className='text-gray-800 text-xl md:text-2xl font-bold'>
                        ${data.price}
                      </span>
                    </div>

                    <span className='text-gray-500 text-sm'>
                      incl. VAT plus shipping
                    </span>
                  </div>
                  <div className='flex items-center text-gray-500 gap-2 mb-6'>
                    <MdLocalShipping />
                    <span className='text-sm'>2-4 day shipping</span>
                  </div>
                  <div className='flex md:block gap-2.5 md:space-y-5'>
                    {!isAuth && (
                      <button
                        onClick={() => setLoginModal(true)}
                        href='#'
                        className='inline-block w-full flex-1 sm:flex-none bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3'
                      >
                        Buy Now
                      </button>
                    )}
                    {isAuth && (
                      <Link
                        to='cart'
                        className='inline-block w-full flex-1 sm:flex-none bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3'
                      >
                        Buy Now
                      </Link>
                    )}
                    <button
                      onClick={addToCart}
                      href='#'
                      className='inline-flex w-full justify-center items-center gap-2 bg-gray-200 hover:bg-gray-300 focus-visible:ring ring-indigo-300 text-gray-500 active:text-gray-700 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-4 py-3'
                    >
                      <AiOutlineShoppingCart className='text-2xl' /> Add To Cart
                    </button>
                  </div>
                </div>
              </div>

              {/* description  */}
              <div className='mt-10 md:mt-16 lg:mt-20'>
                <div className='text-gray-800 text-lg font-semibold mb-3'>
                  Description
                </div>

                <p className='text-gray-500'>{data.description}</p>
              </div>
            </div>

            {/* product reviews  */}
            <div className='mt-24'>
              <div className='max-w-screen-xl px-4 md:px-8 mx-auto'>
                <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12'>
                  <div>
                    <div className='border rounded-lg p-4'>
                      <h2 className='text-gray-800 text-lg lg:text-xl font-bold mb-3'>
                        Customer Reviews
                      </h2>

                      <div className='flex items-center gap-2 mb-0.5'>
                        <div className='flex gap-0.5 -ml-1'>
                          <AiFillStar className='w-6 h-6 text-yellow-400' />
                          <AiFillStar className='w-6 h-6 text-yellow-400' />
                          <AiFillStar className='w-6 h-6 text-yellow-400' />
                          <AiFillStar className='w-6 h-6 text-yellow-400' />
                          <AiFillStar className='w-6 h-6 text-yellow-400' />
                        </div>

                        <span className='text-sm font-semibold'>4/5</span>
                      </div>

                      <span className='block text-gray-500 text-sm'>
                        Bases on 27 reviews
                      </span>

                      <div className='flex flex-col border-t border-b gap-2 py-5 my-5'>
                        <div className='flex items-center gap-3'>
                          <span className='w-10 text-gray-600 text-sm text-right whitespace-nowrap'>
                            5 Star
                          </span>

                          <div className='h-4 flex flex-1 bg-gray-200 overflow-hidden rounded'>
                            <span className='w-3/4 h-full bg-yellow-400 rounded'></span>
                          </div>
                        </div>
                        <div className='flex items-center gap-3'>
                          <span className='w-10 text-gray-600 text-sm text-right whitespace-nowrap'>
                            4 Star
                          </span>

                          <div className='h-4 flex flex-1 bg-gray-200 overflow-hidden rounded'>
                            <span className='w-1/2 h-full bg-yellow-400 rounded'></span>
                          </div>
                        </div>
                        <div className='flex items-center gap-3'>
                          <span className='w-10 text-gray-600 text-sm text-right whitespace-nowrap'>
                            3 Star
                          </span>

                          <div className='h-4 flex flex-1 bg-gray-200 overflow-hidden rounded'>
                            <span className='w-1/6 h-full bg-yellow-400 rounded'></span>
                          </div>
                        </div>
                        <div className='flex items-center gap-3'>
                          <span className='w-10 text-gray-600 text-sm text-right whitespace-nowrap'>
                            2 Star
                          </span>

                          <div className='h-4 flex flex-1 bg-gray-200 overflow-hidden rounded'>
                            <span className='w-1/4 h-full bg-yellow-400 rounded'></span>
                          </div>
                        </div>
                        <div className='flex items-center gap-3'>
                          <span className='w-10 text-gray-600 text-sm text-right whitespace-nowrap'>
                            1 Star
                          </span>

                          <div className='h-4 flex flex-1 bg-gray-200 overflow-hidden rounded'>
                            <span className='w-1/12 h-full bg-yellow-400 rounded'></span>
                          </div>
                        </div>
                      </div>

                      <a
                        href='#'
                        className='block bg-white hover:bg-gray-100 active:bg-gray-200 focus-visible:ring ring-indigo-300 border text-gray-500 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-4 md:px-8 py-2 md:py-3'
                      >
                        Write a review
                      </a>
                    </div>
                  </div>
                  <div className='lg:col-span-2'>
                    <div className='border-b pb-4 md:pb-6'>
                      <h2 className='text-gray-800 text-lg lg:text-xl font-bold'>
                        Top Reviews
                      </h2>
                    </div>

                    <div className='divide-y'>
                      <PrdouctReview />
                    </div>

                    <div className='border-t pt-6'>
                      <a
                        href='#'
                        className='flex items-center text-indigo-400 hover:text-indigo-500 active:text-indigo-600 font-semibold transition duration-100 gap-0.5'
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
      )}
    </>
  )
}
