import React from 'react'

function Loader() {
  return (
    <div
      className='spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full'
      role='status'
    >
      <span className='visually-hidden'>Loading...</span>
    </div>
  )
}

export default Loader
