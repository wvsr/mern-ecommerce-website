import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'

function Pagination({ totalPages, currentPage, queryParams }) {
  return (
    <div>
      <div className='flex flex-col items-center my-8'>
        <span className='text-sm text-gray-700'>
          Showing{' '}
          <span className='font-semibold text-gray-900'>{currentPage}</span> out
          of <span className='font-semibold text-gray-900'>{totalPages}</span>{' '}
        </span>
        <div className='inline-flex mt-2 xs:mt-0'>
          {/*  Buttons */}
          <Link
            to={`/search?q=${queryParams}&page=${Number(currentPage) - 1}`}
            onClick={() => window.scrollTo(0, 0)}
            className='inline-flex py-2 items-center px-4 py-2text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 rounded-r'
          >
            <AiOutlineArrowLeft className='w-5 h-5 mr-3' />
            Prev
          </Link>
          <Link
            to={`/search?q=${queryParams}&page=${Number(currentPage) + 1}`}
            onClick={() => window.scrollTo(0, 0)}
            className='inline-flex py-2 items-center px-4 py-2text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 border-l700 rounded-l'
          >
            Next
            <AiOutlineArrowRight className='w-5 h-5 ml-3' />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Pagination
