import { useMutation } from '../../../../../../../../hooks/useMutation'
import { apiPostExitJoin } from '../../../../../../../../api/events'
import _ from 'lodash'

const useEventExitMutation = () => {
    const {
        data,
        error,
        mutate,
        reset,
        isLoading
    } = useMutation({
        callback: apiPostExitJoin
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

export default useEventExitMutation
