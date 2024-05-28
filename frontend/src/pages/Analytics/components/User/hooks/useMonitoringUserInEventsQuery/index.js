import { USE_QUERY_CACHE_MONITORING_FAVORITES_USER } from './constants'
import { useQuery } from '../../../../../../hooks/useQuery'
import { apiGetMonitoringFavoriteUser } from '../../../../../../api/monitoring'

const useMonitoringUserInEventsQuery = () => {
	const {
		isLoading,
		data,
		error,
		refetch
	} = useQuery({
		key: USE_QUERY_CACHE_MONITORING_FAVORITES_USER,
		callback: apiGetMonitoringFavoriteUser
	})

	return {
		isLoading: isLoading,
		data: data,
		error: error,
		refetch: refetch
	}
}

export default useMonitoringUserInEventsQuery
