import { USE_QUERY_CACHE_MONITORING_GENDER } from './constants'
import { useQuery } from '../../../../../../hooks/useQuery'
import { apiGetMonitoringUsersByGender } from '../../../../../../api/monitoring'

const useMonitoringUsersByGenderQuery = () => {
	const {
		isLoading,
		data,
		error,
		refetch
	} = useQuery({
		key: USE_QUERY_CACHE_MONITORING_GENDER,
		callback: apiGetMonitoringUsersByGender
	})


	return {
		isLoading: isLoading,
		data: data,
		error: error,
		refetch: refetch
	}
}

export default useMonitoringUsersByGenderQuery
