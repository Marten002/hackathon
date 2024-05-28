import { USE_QUERY_CACHE_USERS_ALL } from './constants'
import { apiGetUsersAll } from '../../../../api/users'
import { useQuery } from '../../../../hooks/useQuery'

const useUsersAllQuery = () => {
	const {
		isLoading,
		data,
		error,
		refetch
	} = useQuery({
		key: USE_QUERY_CACHE_USERS_ALL,
		callback: apiGetUsersAll
	})

	return {
		isLoading: isLoading,
		data: data,
		error: error,
		refetch: refetch
	}
}

export default useUsersAllQuery
