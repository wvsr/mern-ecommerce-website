import React, { useState } from 'react'
import { useFetch } from '../../hooks/fetchData'
import axios from 'axios'
import Modal from '../../components/Modal'
import Loader from '../../components/Loader'
import Pagination from '../../components/Pagination'

function Products() {
  const [productModal, setProductModal] = useState(false)
  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productPrice, setProductPrice] = useState(0)
  const [selectedFiles, setSelectedFiles] = useState()
  const [errors, setErrors] = useState([])
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    data: productsList,
    isLoading,
    error,
    setData: setProductData,
  } = useFetch('/product')
  console.log(productsList?.products)
  const handleProductSubmit = async (e) => {
    e.preventDefault()
    console.log(selectedFiles)
    setErrors([])
    setSuccess(false)
    try {
      setLoading(true)
      let formData = new FormData()
      formData.append('title', productName)
      formData.append('description', productDescription)
      formData.append('price', productPrice)
      formData.append('poster', selectedFiles[0])
      const submitUser = await axios.post('/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setSuccess(true)
      setProductData([submitUser, ...productsList])
      setProductName('')
      setProductDescription('')
      setProductPrice('')
    } catch (error) {
      setErrors(
        error?.response?.data?.errors || [
          { msg: error.response?.data?.message },
        ]
      )
    }
    setLoading(false)
  }
  const TableRow = (item) => {
    const handleDelete = async () => {
      try {
        const deleteDoc = await axios.delete(`/product/${item._id}`)
        setProductData(productsList.filter((e) => e._id !== item._id))
      } catch (error) {
        console.error(error)
      }
    }
    return (
      <tr className='bg-white border-b'>
        <th
          scope='row'
          className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'
        >
          {item.title}
        </th>
        <td className='px-6 py-4'>{item.star}</td>
        <td className='px-6 py-4'>{new Date(item.createdAt).toDateString()}</td>
        <td className='px-6 py-4'>$ {item.price}</td>
        <td className='px-6 py-4'>
          <button href='#' className='font-medium text-blue-600 mr-3'>
            Edit
          </button>
          <button
            href='#'
            className='font-medium text-red-600'
            onClick={handleDelete}
          >
            Delete
          </button>
        </td>
      </tr>
    )
  }
  if (error) return <h1>Error happern</h1>
  return (
    <div className='container max-w-screen-lg mx-auto py-3 px-3'>
      <button
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
        onClick={() => setProductModal(true)}
      >
        Add product
      </button>
      {/* // add product modal */}
      {isLoading && <Loader />}
      {productsList && (
        <>
          <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='w-full text-sm text-left text-gray-500'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    Product name
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    star
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Created At
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Price
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(productsList.products) &&
                  productsList.products.map((item) => <TableRow {...item} />)}
              </tbody>
            </table>
          </div>
          <Pagination />
        </>
      )}

      <Modal isOpen={productModal} closeModal={setProductModal}>
        <form onSubmit={handleProductSubmit}>
          <div className='pt-1 pb-4 space-y-2'>
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
            <label
              htmlFor='product-name'
              className='block mb-2 text-sm font-medium text-gray-900'
            >
              product name
            </label>
            <input
              type='text'
              id='product-name'
              placeholder='type your product name'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none'
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
              required
            />
          </div>
          <div className='mb-6'>
            <label
              className='block mb-2 text-sm font-medium text-gray-900'
              for='poster'
            >
              Poster
            </label>
            <input
              className='block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50'
              id='poster'
              type='file'
              onChange={(e) => {
                setSelectedFiles(e.target.files)
              }}
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='product-description'
              className='block mb-2 text-sm font-medium text-gray-900'
            >
              product description
            </label>
            <textarea
              type='text'
              id='product-description'
              placeholder='type your product description'
              rows={6}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none'
              onChange={(e) => setProductDescription(e.target.value)}
              value={productDescription}
              required
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='product-price'
              className='block mb-2 text-sm font-medium text-gray-900'
            >
              price
            </label>
            <input
              type='number'
              id='product-price'
              placeholder='type your product price'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none'
              onChange={(e) => setProductPrice(e.target.value)}
              required
              value={productPrice}
            />
          </div>
          <button
            type='submit'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
          >
            {loading ? 'Loading ...' : 'creat product'}
          </button>
        </form>
      </Modal>
    </div>
  )
}

export default Products
