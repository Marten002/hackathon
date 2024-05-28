import { useQuery } from '../../../../hooks/useQuery'
import { apiGetAllEvents } from '../../../../api/events'

import { USE_QUERY_CACHE_ALL_EVENTS } from './constants'

const useEventsAllQuery = () => {
    const {
        data,
        refetch,
        error,
        isLoading
    } = useQuery({
        callback: apiGetAllEvents,
        key: USE_QUERY_CACHE_ALL_EVENTS
    })

    return {
        data: data,
        error: error,
        isLoading: isLoading,
        refetch: refetch
    }
}

export default useEventsAllQuery