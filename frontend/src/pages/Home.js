import React, { useEffect, useState } from 'react'
import CarouselHolder from '../components/skeletons/CarouselHolder'
import CardHolder from '../components/skeletons/CardHolder'
import ProductCard from '../components/ProductCard'
import { useFetch } from '../hooks/fetchData'
import Hero from '../components/Hero'
export default function Home() {
  const { data, error, isLoading } = useFetch('https://dummyjson.com/products')
  if (error) return <h1>Error Happen</h1>
  // if (isLoading) {
  //   return (
  //     <>
  //       <main className='container max-w-6 mt-5 mx-auto'>
  //         <section className='mb-4 mt-8 mx-3'>
  //           <h2 className='text-2xl my-5 capitalize'>Explore our books</h2>
  //           <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 '>
  //             <CardHolder />
  //             <CardHolder />
  //             <CardHolder />
  //             <CardHolder />
  //             <CardHolder />
  //             <CardHolder />
  //           </div>
  //         </section>
  //       </main>
  //     </>
  //   )
  // }
  return (
    <main className='container max-w-6 mt-5 mx-auto'>
      <Hero />
      <section className='mb-4 mt-8 mx-3'>
        <h2 className='text-2xl my-5 capitalize'>Explore our books</h2>
        <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 '>
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
