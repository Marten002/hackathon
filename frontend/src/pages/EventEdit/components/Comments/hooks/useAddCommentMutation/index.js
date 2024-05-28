import { useMutation } from '../../../../../../hooks/useMutation'
import { apiPostEventComment } from '../../../../../../api/events'
import _ from 'lodash'

const useAddCommentMutation = () => {
    const {
        data,
        error,
        mutate,
        reset,
        isLoading
    } = useMutation({
        callback: apiPostEventComment
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

export default useAddCommentMutation
