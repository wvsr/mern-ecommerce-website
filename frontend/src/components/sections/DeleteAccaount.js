function DeleteAccaount() {
  return (
    <div className='my-6 py-5 px-3 rounded-lg border border-red-300 bg-red-200 max-w-md'>
      <h2 className='text-lg mb-4'>Delete Your Account</h2>
      <button
        type='button'
        className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
      >
        Delete My Account
      </button>
    </div>
  )
}

export default DeleteAccaount
