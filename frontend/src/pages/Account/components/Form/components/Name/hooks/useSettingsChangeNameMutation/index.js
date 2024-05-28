import { useMutation } from '../../../../../../../../hooks/useMutation'
import { apiPostSettingsChangeName } from '../../../../../../../../api/settings'


const useSettingsChangeNameMutation = () => {
	const {
		isLoading,
		data,
		error,
		mutate,
		reset
	} = useMutation({
		callback: apiPostSettingsChangeName
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

export default useSettingsChangeNameMutation
