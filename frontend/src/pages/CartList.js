import React, { useEffect, useState } from 'react'
import Modal from '../components/Modal'
import axios from 'axios'
const CartList = () => {
  const [cart, setCart] = useState([])
  const [orderModal, setOrderModal] = useState(false)
  const [errors, setErrors] = useState([])
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [shippingLocation, setShippingLocation] = useState('')
  const getCart = JSON.parse(localStorage.getItem('products'))
  let totalPrice = getCart?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const postOrder = axios.post('/order', {
        orderItems: cart.map((orderItem) => [
          orderItem._id,
          orderItem.quantity,
        ]),
        shippingLocation,
      })
      console.log(postOrder)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (getCart) {
      setCart(getCart)
    }
  }, [])

  console.log(cart)
  const CartCard = ({ poster, _id, price, quantity: InitQuantity, title }) => {
    // delete product from cart
    const [quantity, setQuantity] = useState(InitQuantity)
    const deleteFromCart = () => {
      const deletedProduct = getCart.filter((product) => product._id !== _id)
      setCart(deletedProduct)
      localStorage.setItem('products', JSON.stringify(deletedProduct))
    }

    // increase quantity
    const increaseQuantity = () => {
      const removeProduct = getCart.filter((product) => product._id !== _id)
      let getProduct = getCart.find((e) => e._id === _id)
      getProduct.quantity = getProduct.quantity + 1
      localStorage.setItem(
        'products',
        JSON.stringify(removeProduct.concat(getProduct))
      )
      setQuantity(quantity + 1)
    }
    // decrease quantity
    const decreaseQuantity = () => {
      const removeProduct = getCart.filter((product) => product._id !== _id)
      let getProduct = getCart.find((e) => e._id === _id)
      getProduct.quantity = getProduct.quantity - 1
      if (getProduct.quantity === 0) {
        deleteFromCart()
      } else {
        localStorage.setItem(
          'products',
          JSON.stringify(removeProduct.concat(getProduct))
        )
        setQuantity(quantity - 1)
      }
    }
    return (
      <div className='flex flex-wrap border rounded-lg overflow-hidden gap-x-4 sm:gap-y-4 lg:gap-6'>
        <a
          href='#'
          className='group w-32 sm:w-40 h-48 sm:h-56 block bg-gray-100 overflow-hidden relative'
        >
          <img
            src={poster}
            alt={title}
            className='w-full h-full object-cover object-center group-hover:scale-110 transition duration-200'
          />
        </a>

        <div className='flex flex-col justify-between flex-1 py-4'>
          <div>
            <a
              href='#'
              className='inline-block text-gray-800 hover:text-gray-500 text-lg lg:text-xl font-bold transition duration-100 mb-1'
            >
              {title}
            </a>

            <span className='block text-gray-500'>By: Wasimul Sami</span>
          </div>

          <div>
            <span className='block text-gray-800 md:text-lg font-bold mb-1'>
              ${price}
            </span>
          </div>
        </div>

        <div className='w-full sm:w-auto flex justify-between border-t sm:border-none p-4 sm:pl-0 lg:p-6 lg:pl-0'>
          <div className='flex flex-col items-start gap-2'>
            <div className='w-20 h-12 flex border rounded overflow-hidden'>
              <input
                type='number'
                value={quantity}
                className='w-full focus:ring ring-inset ring-indigo-300 outline-none transition duration-100 px-4 py-2'
                readOnly
              />

              <div className='flex flex-col border-l divide-y'>
                <button
                  className='w-6 flex justify-center items-center flex-1 bg-white hover:bg-gray-100 active:bg-gray-200 leading-none select-none transition duration-100'
                  onClick={increaseQuantity}
                >
                  +
                </button>
                <button
                  className='w-6 flex justify-center items-center flex-1 bg-white hover:bg-gray-100 active:bg-gray-200 leading-none select-none transition duration-100'
                  onClick={decreaseQuantity}
                >
                  -
                </button>
              </div>
            </div>

            <button
              className='text-indigo-500 hover:text-indigo-600 active:text-indigo-700 text-sm font-semibold select-none transition duration-100'
              onClick={deleteFromCart}
            >
              Delete
            </button>
          </div>

          <div className='pt-3 md:pt-2 ml-4 md:ml-8 lg:ml-16'>
            <span className='block text-gray-800 md:text-lg font-bold'>
              ${price}
            </span>
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      <div className='bg-white py-6 sm:py-8 lg:py-12'>
        <div className='max-w-screen-lg px-4 md:px-8 mx-auto'>
          <div className='mb-6 sm:mb-10 lg:mb-16'>
            <h2 className='text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6'>
              Your Cart
            </h2>
          </div>
          <div className='flex flex-col gap-4 md:gap-6 mb-6 sm:mb-8'>
            {Array.isArray(cart) && cart.map((e) => <CartCard {...e} />)}
          </div>
          {/* totals */}
          {cart.length > 0 ? (
            <div className='flex flex-col items-end gap-4'>
              <div className='w-full sm:max-w-xs bg-gray-100 rounded-lg p-4'>
                <div className='space-y-1'>
                  <div className='flex justify-between text-gray-500 gap-4'>
                    <span>Subtotal</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>

                <div className='border-t pt-4 mt-4'>
                  <div className='iflex justify-between items-start text-gray-800 gap-4'>
                    <span className='text-lg font-bold'>Total</span>

                    <span className='flex flex-col items-end'>
                      <span className='text-lg font-bold'>
                        ${totalPrice} USD
                      </span>
                      <span className='text-gray-500 text-sm'>
                        including VAT
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setOrderModal(true)}
                className='inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3'
              >
                Check out
              </button>

              {/* Added this part to render the cart items */}
            </div>
          ) : (
            <>
              <h1 className='text-center text-red'>Your cart is empty!</h1>
            </>
          )}
        </div>
      </div>

      {/* place order modal */}
      <Modal isOpen={orderModal} closeModal={setOrderModal}>
        <form onSubmit={handlePlaceOrder}>
          <div className='pt-1  space-y-2'>
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
                Product created successfully
              </div>
            )}
          </div>
          <div className='mb-6'>
            <h2 className='block mb-2 text-sm font-medium text-gray-900'>
              Products:
            </h2>
            <div className='grid grid-cols-2 gap-2'>
              {cart.map((product) => (
                <div
                  key={product._id}
                  className='border border-gray-200 sahdow-sm rounded-md px-2 py-2'
                >
                  <img
                    src={product?.poster}
                    alt={product?.title}
                    className='rounded-md'
                  />
                  <p>{product?.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className='mb-6'>
            <label
              htmlFor='order-location'
              className='block mb-2 text-sm font-medium text-gray-900'
            >
              Order location
            </label>
            <textarea
              type='text'
              id='order-location'
              placeholder='type your order location'
              onChange={(e) => setShippingLocation(e.target.value)}
              rows={4}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none'
              // onChange={(e) => setProductDescription(e.target.value)}
              required
            />
          </div>

          <button
            type='submit'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
          >
            {loading ? 'Loading ...' : 'order confirm'}
          </button>
        </form>
      </Modal>
    </>
  )
}

export default CartList
