import { useMutation } from '../../../../../../hooks/useMutation'
import { apiDeleteUserDeleteMany } from '../../../../../../api/users'

const useUserDeleteManyMutation = () => {
	const {
		data,
		error,
		mutate,
		reset,
		isLoading
	} = useMutation({
		callback: apiDeleteUserDeleteMany
	})

	return {
		data: data,
		error: error,
		reset: reset,
		isLoading: isLoading,
		mutate: (data) => {
			mutate(data)
		}
	}
}

export default useUserDeleteManyMutation
