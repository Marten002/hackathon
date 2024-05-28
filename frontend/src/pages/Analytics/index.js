import React, { memo } from 'react'
import { EuiFlexGroup, EuiFlexItem, EuiText, EuiTitle } from '@elastic/eui'
import Breadcrumbs from '../../components/Breadcrumbs'
import { COLOR_DEFAULT } from '../../constants/colors'
import { Routs } from '../../routs'
import Users from './components/Users'
import Tags from './components/Tags'
import Participants from './components/Participants'
import Favorite from './components/Favorite'
import User from './components/User'

const Analytics = () => {

	const breadcrumbs = [
		{
			text: 'Мероприятия',
			href: Routs.index
		},
		{
			text: 'Аналитика',
			href: Routs.analytics.index
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
								<b>Аналитика</b>
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
								Аналитика мероприятий и пользователей
							</EuiText>
						</EuiFlexItem>
					</EuiFlexGroup>
				</EuiFlexItem>
				<EuiFlexItem>
					<EuiFlexGroup gutterSize="m">
						<EuiFlexItem>
							<Users/>
						</EuiFlexItem>
						<EuiFlexItem>
							<User/>
						</EuiFlexItem>
					</EuiFlexGroup>
				</EuiFlexItem>
				<EuiFlexItem>
					<Tags/>
				</EuiFlexItem>
				<EuiFlexItem>
					<Participants/>
				</EuiFlexItem>
				<EuiFlexItem>
					<Favorite/>
				</EuiFlexItem>
			</EuiFlexGroup>
		</>
	)
}

export default memo(Analytics)
