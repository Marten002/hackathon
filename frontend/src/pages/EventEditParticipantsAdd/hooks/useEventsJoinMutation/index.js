import { useMutation } from '../../../../hooks/useMutation'
import { apiPostEventJoinManyParticipants } from '../../../../api/events'
import _ from 'lodash'

const useEventsJoinMutation = () => {
    const {
        data,
        error,
        isLoading,
        reset,
        mutate
    } = useMutation({
        callback: apiPostEventJoinManyParticipants
    })

    return {
        data: data,
        error: error,
        isLoading: isLoading,
        reset: reset,
        mutate: (data) => {
            mutate({
                payload: _.get(data, 'payload', null)
            })
        }
    }
}

export default useEventsJoinMutation