import { useMutation } from '../../../hooks/useMutation'
import { apiPostEventCreate } from '../../../api/events'
import _ from 'lodash'

const useEventCreateMutation = () => {
    const {
        data,
        error,
        mutate,
        reset,
        isLoading
    } = useMutation({
        callback: apiPostEventCreate
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

export default useEventCreateMutation
