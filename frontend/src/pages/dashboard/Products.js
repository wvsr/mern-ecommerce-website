import React, { useState } from 'react'
import { useFetch } from '../../hooks/fetchData'
import axios from 'axios'
import Modal from '../../components/Modal'

function Products() {
  const [productModal, setProductModal] = useState(false)
  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productPrice, setProductPrice] = useState(0)
  const [selectedFiles, setSelectedFiles] = useState()
  const [errors, setErrors] = useState([])
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const { data: productsList, isLoading, error } = useFetch('/product')
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
  return (
    <div className='container max-w-screen-lg mx-auto py-3 px-3'>
      <button
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
        onClick={() => setProductModal(true)}
      >
        Add product
      </button>
      {/* // add product modal */}

      <div class='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table class='w-full text-sm text-left text-gray-500'>
          <thead class='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th scope='col' class='px-6 py-3'>
                Product name
              </th>
              <th scope='col' class='px-6 py-3'>
                star
              </th>
              <th scope='col' class='px-6 py-3'>
                Created At
              </th>
              <th scope='col' class='px-6 py-3'>
                Price
              </th>
              <th scope='col' class='px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(productsList.products) &&
              productsList.products.map((item) => (
                <tr class='bg-white border-b'>
                  <th
                    scope='row'
                    class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'
                  >
                    {item.title}
                  </th>
                  <td class='px-6 py-4'>{item.star}</td>
                  <td class='px-6 py-4'>
                    {new Date(item.createdAt).toDateString()}
                  </td>
                  <td class='px-6 py-4'>$ {item.price}</td>
                  <td class='px-6 py-4'>
                    <a href='#' class='font-medium text-blue-600 mr-3'>
                      Edit
                    </a>
                    <a href='#' class='font-medium text-red-600'>
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

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
          <div class='mb-6'>
            <label
              htmlFor='product-name'
              class='block mb-2 text-sm font-medium text-gray-900'
            >
              product name
            </label>
            <input
              type='text'
              id='product-name'
              placeholder='type your product name'
              class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none'
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
              required
            />
          </div>
          <div className='mb-6'>
            <label
              class='block mb-2 text-sm font-medium text-gray-900'
              for='poster'
            >
              Poster
            </label>
            <input
              class='block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50'
              id='poster'
              type='file'
              onChange={(e) => {
                setSelectedFiles(e.target.files)
              }}
            />
          </div>
          <div class='mb-6'>
            <label
              htmlFor='product-description'
              class='block mb-2 text-sm font-medium text-gray-900'
            >
              product description
            </label>
            <textarea
              type='text'
              id='product-description'
              placeholder='type your product description'
              rows={6}
              class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none'
              onChange={(e) => setProductDescription(e.target.value)}
              value={productDescription}
              required
            />
          </div>
          <div class='mb-6'>
            <label
              htmlFor='product-price'
              class='block mb-2 text-sm font-medium text-gray-900'
            >
              price
            </label>
            <input
              type='number'
              id='product-price'
              placeholder='type your product price'
              class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none'
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
