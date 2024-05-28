import React, { memo } from 'react'
import { EuiFlexGroup, EuiFlexItem, EuiText, EuiTitle } from '@elastic/eui'

import { COLOR_DEFAULT } from '../../constants/colors'

import Form from './components/Form'
import Notification from './components/Notification'
import { Routs } from '../../routs'
import Breadcrumbs from '../../components/Breadcrumbs'

const Authentication = () => {

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
			text: 'Аккаунт',
			href: Routs.settings.change.account.index
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
								<b>Аккаунт</b>
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
								Изменение доступных настроек аккаунта
							</EuiText>
						</EuiFlexItem>
					</EuiFlexGroup>
				</EuiFlexItem>
				<EuiFlexItem>
					<Form/>
				</EuiFlexItem>
				<EuiFlexItem>
					<Notification/>
				</EuiFlexItem>
			</EuiFlexGroup>
		</>
	)
}

export default memo(Authentication)
