import { useQuery } from '../../../../hooks/useQuery'
import { apiGetEvent } from '../../../../api/events'
import { USE_QUERY_CACHED_EVENT } from './constants'

const useEventQuery = ({ query }) => {
    const {
        data,
        isLoading,
        error,
        refetch
    } = useQuery({
        params: {
            query: query
        },
        callback: apiGetEvent,
        key: USE_QUERY_CACHED_EVENT
    })

    return {
        data: data,
        isLoading: isLoading,
        error: error,
        refetch: refetch
    }
}

export default useEventQuery