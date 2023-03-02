import React, { useEffect, useState } from 'react'
import CardHolder from '../components/skeletons/CardHolder'
import ProductCard from '../components/ProductCard'
import { useFetch } from '../hooks/fetchData'
import Hero from '../components/sections/Hero'

export default function Home() {
  const { data, error, isLoading } = useFetch('/product')
  if (error) return <h1>Error Happen</h1>

  return (
    <main className='container max-w-6 mt-5 mx-auto'>
      <Hero />
      <section className='mb-4 mt-8 mx-3'>
        <h2 className='text-2xl my-5 capitalize font-bold text-gray-600 text-center md:text-left'>
          Explore our books
        </h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 '>
          {isLoading && (
            <>
              <CardHolder />
              <CardHolder />
              <CardHolder />
              <CardHolder />
              <CardHolder />
              <CardHolder />
            </>
          )}
          {Array.isArray(data.products) &&
            data?.products.map((product) => (
              <ProductCard {...product} key={product.id} />
            ))}
        </div>
      </section>
    </main>
  )
}
