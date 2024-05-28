import { get } from '../../localStorage'

export const getTheme = () => {
	return get('theme', 'light')
}
