import { useMutation } from '../../../../../../hooks/useMutation'
import { apiDeleteEventComment } from '../../../../../../api/events'
import _ from 'lodash'

const useDeleteCommentMutation = () => {
    const {
        data,
        error,
        mutate,
        reset,
        isLoading
    } = useMutation({
        callback: apiDeleteEventComment
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

export default useDeleteCommentMutation
