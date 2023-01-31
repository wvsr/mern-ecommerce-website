import axios from 'axios'
import { useState, useEffect } from 'react'
function useFetch(url) {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    ;(async function () {
      try {
        setIsLoading(true)
        const response = await axios.get(url)
        setData(response.data)
      } catch (err) {
        setError(err)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [url])

  return { data, error, isLoading, setData }
}

export { useFetch }
