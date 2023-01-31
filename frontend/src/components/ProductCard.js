import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard(product) {
  return (
    <div>
      <Link
        to={`/product/${product._id}`}
        className='group min-w-full h-56 md:min-w-lg md:h-96 block bg-gray-100 rounded-lg overflow-hidden shadow-lg relative mb-2 lg:mb-3'
      >
        <img
          src={product.poster}
          loading='lazy'
          alt={product.title}
          className='w-full h-full object-cover object-center group-hover:scale-110 transition duration-200'
        />
      </Link>

      <div className='flex justify-between items-start gap-2 px-2'>
        <div className='flex flex-col'>
          <Link
            to={`product/${product._id}`}
            className='text-gray-800 hover:text-gray-500 text-lg lg:text-xl font-bold transition duration-100'
          >
            {product.title}
          </Link>
          <span className='text-gray-500'>by {product.author}</span>
        </div>

        <div className='flex flex-col items-end'>
          <span className='text-gray-600 lg:text-lg font-bold'>
            $ {product.price}
          </span>
        </div>
      </div>
    </div>
  )
}
