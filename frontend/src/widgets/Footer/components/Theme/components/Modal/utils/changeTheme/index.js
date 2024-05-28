import { set } from '../../../../../../../../utils/localStorage'

export const changeTheme = (theme) => {
	set({ key: 'theme', value: theme, withEvent: true })
}
