import { USE_QUERY_CACHE_MONITORING_PARTICIPANTS } from './constants'
import { useQuery } from '../../../../../../hooks/useQuery'
import { apiGetMonitoringParticipantsInEvents } from '../../../../../../api/monitoring'

const useMonitoringParticipantsInEventsQuery = () => {
	const {
		isLoading,
		data,
		error,
		refetch
	} = useQuery({
		key: USE_QUERY_CACHE_MONITORING_PARTICIPANTS,
		callback: apiGetMonitoringParticipantsInEvents
	})

	return {
		isLoading: isLoading,
		data: data,
		error: error,
		refetch: refetch
	}
}

export default useMonitoringParticipantsInEventsQuery
