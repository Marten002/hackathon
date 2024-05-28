import { useMutation } from '../../../../../../hooks/useMutation'
import { apiPutUserChange } from '../../../../../../api/users'

const useUserChangeMutation = () => {
	const {
		data,
		error,
		mutate,
		reset,
		isLoading
	} = useMutation({
		callback: apiPutUserChange
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

export default useUserChangeMutation
