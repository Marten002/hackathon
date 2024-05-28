import React, { memo } from 'react'
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiIcon, EuiText, EuiTitle } from '@elastic/eui'
import { Link } from 'react-router-dom'

import { Routs } from '../../routs'

import { COLOR_DEFAULT, COLOR_SUBDUED } from '../../constants/colors'
import Breadcrumbs from '../../components/Breadcrumbs'

const Settings = () => {

	const breadcrumbs = [
		{
			text: 'Мероприятия',
			href: Routs.index
		},
		{
			text: 'Настройки',
			href: Routs.settings.index
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
								<b>Настройки</b>
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
								Изменение настроек 2FA, пароля и имени
							</EuiText>
						</EuiFlexItem>
					</EuiFlexGroup>
				</EuiFlexItem>
				<EuiFlexItem>
					<Link to={Routs.settings.authentication.index}>
						<EuiCard
							layout="horizontal"
							display="plain"
							icon={
								<EuiIcon
									aria-label="icon-key"
									type="key"
									size="l"
									color={COLOR_SUBDUED}
									onClick={null}
									style={null}
									className={null}
								/>
							}
							title="2FA"
							isDisabled={false}
							hasBorder={true}
							description="Подключение двух-факторной аутентификации"
							onClick={null}
						/>
					</Link>
				</EuiFlexItem>
				<EuiFlexItem>
					<EuiFlexGroup gutterSize="m">
						<EuiFlexItem>
							<Link to={Routs.settings.change.password.index}>
								<EuiCard
									layout="horizontal"
									display="plain"
									icon={
										<EuiIcon
											aria-label="icon-lock"
											type="lock"
											size="l"
											color={COLOR_SUBDUED}
											onClick={null}
											style={null}
											className={null}
										/>
									}
									title="Пароль"
									isDisabled={false}
									hasBorder={true}
									description="Изменение пароля от учетной записи пользователя"
									onClick={null}
								/>
							</Link>
						</EuiFlexItem>
						<EuiFlexItem>
							<Link to={Routs.settings.change.account.index}>
								<EuiCard
									layout="horizontal"
									display="plain"
									icon={
										<EuiIcon
											aria-label="icon-userAvatar"
											type="userAvatar"
											size="l"
											color={COLOR_SUBDUED}
											onClick={null}
											style={null}
											className={null}
										/>
									}
									title="Аккаунт"
									isDisabled={false}
									hasBorder={true}
									description="Изменение данных учетной записи пользователя"
									onClick={null}
								/>
							</Link>
						</EuiFlexItem>
					</EuiFlexGroup>
				</EuiFlexItem>
			</EuiFlexGroup>
		</>
	)
}

export default memo(Settings)
