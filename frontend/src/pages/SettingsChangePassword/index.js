import React, { memo } from 'react'
import { EuiFlexGroup, EuiFlexItem, EuiText, EuiTitle } from '@elastic/eui'

import { COLOR_DEFAULT } from '../../constants/colors'

import Form from './components/Form'
import Breadcrumbs from '../../components/Breadcrumbs'
import { Routs } from '../../routs'

const SettingsChangePassword = () => {
	const breadcrumbs = [
		{
			text: 'Мероприятия',
			href: Routs.index
		},
		{
			text: 'Настройки',
			href: Routs.settings.index
		},
		{
			text: 'Пароль',
			href: Routs.settings.change.password.index
		}
	]

	return (
		<>
			<Breadcrumbs
				breadcrumbs={breadcrumbs}
			/>
			<EuiFlexGroup gutterSize="m" direction="column">
				<EuiFlexItem>
					<EuiFlexGroup gutterSize="xs" direction="column">
						<EuiFlexItem>
							<EuiTitle size="m">
								<b>Пароль</b>
							</EuiTitle>
						</EuiFlexItem>
						<EuiFlexItem>
							<EuiText
								size="m"
								color={COLOR_DEFAULT}
								grow={false}
								onClick={null}
								className={null}
								style={null}
							>
								Изменение пароля от учетной записи пользователя
							</EuiText>
						</EuiFlexItem>
					</EuiFlexGroup>
				</EuiFlexItem>
				<EuiFlexItem>
					<Form/>
				</EuiFlexItem>
			</EuiFlexGroup>
		</>
	)
}

export default memo(SettingsChangePassword)
