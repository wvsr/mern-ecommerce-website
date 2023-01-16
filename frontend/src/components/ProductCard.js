import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard(product) {
  return (
    <div>
      <Link
        to={`/product/${product.id}`}
        class='group min-w-lg h-96 block bg-gray-100 rounded-lg overflow-hidden shadow-lg relative mb-2 lg:mb-3'
      >
        <img
          src={product.thumbnail}
          loading='lazy'
          alt='Photo by Nick Karvounis'
          class='w-full h-full object-cover object-center group-hover:scale-110 transition duration-200'
        />
      </Link>

      <div class='flex justify-between items-start gap-2 px-2'>
        <div class='flex flex-col'>
          <Link
            to={`product/${product.id}`}
            class='text-gray-800 hover:text-gray-500 text-lg lg:text-xl font-bold transition duration-100'
          >
            {product.title}
          </Link>
          <span class='text-gray-500'>by Cool Brand</span>
        </div>

        <div class='flex flex-col items-end'>
          <span class='text-gray-600 lg:text-lg font-bold'>
            $ {product.price}
          </span>
        </div>
      </div>
    </div>
  )
}
