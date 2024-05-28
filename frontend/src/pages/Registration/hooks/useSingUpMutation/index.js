import { useMutation } from '../../../../hooks/useMutation'
import { apiPostSingUp } from '../../../../api/auth'

const useSingUpMutation = () => {
	const {
		data,
		error,
		mutate,
		reset,
		isLoading
	} = useMutation({
		callback: apiPostSingUp
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

export default useSingUpMutation
