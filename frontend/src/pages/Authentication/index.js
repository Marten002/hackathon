import React, { memo } from 'react'
import { EuiFlexGroup, EuiFlexItem, EuiText, EuiTitle } from '@elastic/eui'

import { COLOR_DEFAULT } from '../../constants/colors'

import Form from './components/Form'
import History from './components/History'
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
			text: '2FA',
			href: Routs.settings.authentication.index
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
								<b>2FA</b>
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
								Изменение настроек 2FA
							</EuiText>
						</EuiFlexItem>
					</EuiFlexGroup>
				</EuiFlexItem>
				<EuiFlexItem>
					<Form/>
				</EuiFlexItem>
				<EuiFlexItem>
					<History/>
				</EuiFlexItem>
			</EuiFlexGroup>
		</>
	)
}

export default memo(Authentication)
