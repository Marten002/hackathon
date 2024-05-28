import { USE_QUERY_CACHE_MONITORING_FAVORITES } from './constants'
import { useQuery } from '../../../../../../hooks/useQuery'
import { apiGetMonitoringFavoriteEvents } from '../../../../../../api/monitoring'

const useMonitoringFavoriteInEventsQuery = () => {
	const {
		isLoading,
		data,
		error,
		refetch
	} = useQuery({
		key: USE_QUERY_CACHE_MONITORING_FAVORITES,
		callback: apiGetMonitoringFavoriteEvents
	})

	return {
		isLoading: isLoading,
		data: data,
		error: error,
		refetch: refetch
	}
}

export default useMonitoringFavoriteInEventsQuery
