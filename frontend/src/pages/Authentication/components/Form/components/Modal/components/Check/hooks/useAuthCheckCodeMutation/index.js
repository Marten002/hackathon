import { apiPostAuthCheckCode } from '../../../../../../../../../../api/auth/2FA'
import { useMutation } from '../../../../../../../../../../hooks/useMutation'

const useAuthCheckCodeMutation = () => {
	const {
		isLoading,
		data,
		error,
		mutate,
		reset
	} = useMutation({
		callback: apiPostAuthCheckCode
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

export default useAuthCheckCodeMutation
