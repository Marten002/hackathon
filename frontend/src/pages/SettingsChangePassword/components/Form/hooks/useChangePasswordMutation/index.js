import _ from 'lodash'

import { useMutation } from '../../../../../../hooks/useMutation'
import { apiPostChangePassword } from '../../../../../../api/settings'

const useChangePasswordMutation = () => {
    const {
        data,
        error,
        mutate,
        reset,
        isLoading
    } = useMutation({
        callback: apiPostChangePassword
    })

    return {
        data: data,
        error: error,
        reset: reset,
        isLoading: isLoading,
        mutate: (data) => {
            mutate({
                payload: _.get(data, 'payload', '')
            })
        }
    }
}

export default useChangePasswordMutation