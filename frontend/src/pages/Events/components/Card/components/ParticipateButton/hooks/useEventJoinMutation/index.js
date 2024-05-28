import { useMutation } from '../../../../../../../../hooks/useMutation'
import { apiPostEventJoin } from '../../../../../../../../api/events'
import _ from 'lodash'

const useEventJoinMutation = () => {
    const {
        data,
        error,
        mutate,
        reset,
        isLoading
    } = useMutation({
        callback: apiPostEventJoin
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

export default useEventJoinMutation
