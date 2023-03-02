import React from 'react'
import ProductCard from '../components/ProductCard'
import { useSearchParams, Link } from 'react-router-dom'
import Pagination from '../components/Pagination'
import CardHolder from '../components/skeletons/CardHolder'
import { useFetch } from '../hooks/fetchData'

export default function Search() {
  let [searchParams, setSearchParams] = useSearchParams()
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const searchQuery = searchParams.get('q')
  const searchPage = searchParams.get('page')
  const { data, isLoading } = useFetch(
    `/product/search?query=${searchQuery}&page=${searchPage ? searchPage : 1}`
  )
  return (
    <div className='container max-w-screen-xl mx-auto px-3'>
      <p className='text-lg text-gray-800 py-3'>Searching for {searchQuery}</p>
      <div className='mt-8'>
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
            !isLoading &&
            data?.products.map((product) => (
              <ProductCard {...product} key={product.id} />
            ))}
        </div>

        <Pagination
          totalPages={data.totalPages}
          currentPage={data.currentPage}
          queryParams={searchQuery}
          searchQuery
        />
      </div>
    </div>
  )
}
