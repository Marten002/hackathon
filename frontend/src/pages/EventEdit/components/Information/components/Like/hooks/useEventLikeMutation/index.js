import { useMutation } from '../../../../../../../../hooks/useMutation'
import { apiPostEventLike } from '../../../../../../../../api/events'
import _ from 'lodash'

const useEventLikeMutation = () => {
    const {
        data,
        isLoading,
        mutate,
        error,
        reset
    } = useMutation({
        callback: apiPostEventLike
    })

    return {
        data: data,
        error: error,
        isLoading: isLoading,
        mutate: (data) => {
            mutate({
                payload: _.get(data, 'payload', null)
            })
        },
        reset: reset
    }
}

export default useEventLikeMutation