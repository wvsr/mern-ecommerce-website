import React, { useState } from 'react'
import { useFetch } from '../../hooks/fetchData'
import axios from 'axios'
import Modal from '../../components/Modal'
import Loader from '../../components/Loader'
import Pagination from '../../components/Pagination'

function Products() {
  const [loading, setLoading] = useState(false)

  const {
    data: orderList,
    isLoading,
    error,
    setData: setProductData,
  } = useFetch('/order')

  const TableRow = (item) => {
    const handleDelete = async () => {
      try {
        const deleteDoc = await axios.delete(`/ordre/${item._id}`)
        setProductData(orderList.filter((e) => e._id !== item._id))
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
          {item._id}
        </th>
        <td className='px-6 py-4'>{item.orderItems.lenght}</td>
        <td className='px-6 py-4'>{new Date(item.createdAt).toDateString()}</td>
        <td className='px-6 py-4'>$ {item.price}</td>
        <td className='px-6 py-4'>
          <button
            href='#'
            className='font-medium text-blue-600 mr-3'
            onClick={handleUpdate}
          >
            set delivered
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
      {productList && (
        <>
          <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='w-full text-sm text-left text-gray-500'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    Order id
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Total item
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
                {Array.isArray(orderList.orders) &&
                  orderList.orders.map((item) => <TableRow {...item} />)}
              </tbody>
            </table>
          </div>
          <Pagination />
        </>
      )}
    </div>
  )
}

export default Products
