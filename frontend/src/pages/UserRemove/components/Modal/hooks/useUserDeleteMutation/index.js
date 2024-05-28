import { useMutation } from '../../../../../../hooks/useMutation'
import { apiDeleteUserDelete } from '../../../../../../api/users'

const useUserDeleteMutation = () => {
	const {
		data,
		error,
		mutate,
		reset,
		isLoading
	} = useMutation({
		callback: apiDeleteUserDelete
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

export default useUserDeleteMutation
