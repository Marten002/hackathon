import { USE_QUERY_CACHE_MONITORING_TAGS } from './constants'
import { useQuery } from '../../../../../../hooks/useQuery'
import { apiGetMonitoringEventsByTags } from '../../../../../../api/monitoring'

const useMonitoringEventsByTagsQuery = () => {
	const {
		isLoading,
		data,
		error,
		refetch
	} = useQuery({
		key: USE_QUERY_CACHE_MONITORING_TAGS,
		callback: apiGetMonitoringEventsByTags
	})

	return {
		isLoading: isLoading,
		data: data,
		error: error,
		refetch: refetch
	}
}

export default useMonitoringEventsByTagsQuery
