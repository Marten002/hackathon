import { useMutation } from '../../../../hooks/useMutation'
import { apiPostUserCreate } from '../../../../api/users'

const useUserCreateMutation = () => {
	const {
		data,
		error,
		mutate,
		reset,
		isLoading
	} = useMutation({
		callback: apiPostUserCreate
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

export default useUserCreateMutation
