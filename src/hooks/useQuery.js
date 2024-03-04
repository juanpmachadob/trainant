import { useLocation } from 'react-router-dom'

/**
 * It returns a new URLSearchParams object that contains the query string of the current URL.
 *
 * @example
 * const query = useQuery()
 * @returns A new instance of URLSearchParams.
 */
const useQuery = () => {
  const location = useLocation()
  return new URLSearchParams(location.search)
}

export default useQuery
