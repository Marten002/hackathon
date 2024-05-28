import { apiPostAuthSendCode } from '../../../../../../../../../../api/auth/2FA'
import { useMutation } from '../../../../../../../../../../hooks/useMutation'

const useAuthSendCodeMutation = () => {
	const {
		isLoading,
		data,
		error,
		mutate,
		reset
	} = useMutation({
		callback: apiPostAuthSendCode
	})

	return {
		isLoading: isLoading,
		data: data,
		error: error,
		mutate: (data) => {
			mutate(data)
		},
		reset: reset
	}
}

export default useAuthSendCodeMutation
