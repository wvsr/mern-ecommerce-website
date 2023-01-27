import React from 'react'

function OrderHistory() {
  return (
    <div className='border border-gray-200 shadow-sm h-56 overflow-y-scroll max-w-lg my-6 py-5 px-2 rounded-lg'>
      <h2 className='text-lg mb-2 text-gray-800'>Buying History</h2>
      <div className='flex justify-center items-center w-full h-full'>
        <h2 className='text-xl text-center capitalize'>
          You never buy anything
        </h2>
      </div>
    </div>
  )
}

export default OrderHistory
