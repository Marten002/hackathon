import React, { memo } from 'react'
import { EuiFlexGroup, EuiFlexItem, EuiHorizontalRule, EuiIcon, EuiText } from '@elastic/eui'
import { Link, useLocation } from 'react-router-dom'
import _ from 'lodash'

import { COLOR_DEFAULT, COLOR_SUBDUED } from '../../../../constants/colors'

import { Routs } from '../../../../routs'
import { shallowEqual, useSelector } from 'react-redux'
import { userSuccessSelectorReselect } from '../../../../redux/selectors/user'
import { ADMIN_ROLE, ANALYTIC_ROLE, MANAGER_ROLE } from '../../../../constants/roles'

const Menu = () => {
	const userSuccess = useSelector((state) => userSuccessSelectorReselect(state), shallowEqual)
	console.log(userSuccess)
	const { pathname } = useLocation()

	return (
		<>
			<EuiFlexGroup gutterSize="m" direction="column">
				<EuiFlexItem>
					<EuiFlexGroup gutterSize="s" alignItems="center">
						<EuiFlexItem grow={false}>
							<EuiIcon
								aria-label="icon-apps"
								type="apps"
								size="m"
								color={pathname === Routs.index ? COLOR_DEFAULT : COLOR_SUBDUED}
								onClick={null}
								style={null}
							/>
						</EuiFlexItem>
						<EuiFlexItem>
							<Link to={Routs.index}>
								<EuiText
									size="m"
									color={pathname === Routs.index ? COLOR_DEFAULT : COLOR_SUBDUED}
									grow={false}
									onClick={null}
									className={null}
									style={null}
								>
									Мероприятия
								</EuiText>
							</Link>
						</EuiFlexItem>
					</EuiFlexGroup>
				</EuiFlexItem>
				{
					[ADMIN_ROLE, MANAGER_ROLE, ANALYTIC_ROLE].includes(_.get(userSuccess, 'role', ''))
						? <EuiFlexItem>
							<EuiFlexGroup gutterSize="s" alignItems="center">
								<EuiFlexItem grow={false}>
									<EuiIcon
										aria-label="icon-users"
										type="users"
										size="m"
										color={pathname === Routs.users.index ? COLOR_DEFAULT : COLOR_SUBDUED}
										onClick={null}
										style={null}
									/>
								</EuiFlexItem>
								<EuiFlexItem>
									<Link to={Routs.users.index}>
										<EuiText
											size="m"
											color={pathname === Routs.users.index ? COLOR_DEFAULT : COLOR_SUBDUED}
											grow={false}
											onClick={null}
											className={null}
											style={null}
										>
											Пользователи
										</EuiText>
									</Link>
								</EuiFlexItem>
							</EuiFlexGroup>
						</EuiFlexItem>
						: null
				}
				{
						[ADMIN_ROLE, ANALYTIC_ROLE].includes(_.get(userSuccess, 'role', ''))
							? <EuiFlexItem>
								<EuiFlexGroup gutterSize="s" alignItems="center">
									<EuiFlexItem grow={false}>
										<EuiIcon
											aria-label="icon-analyzeEvent"
											type="analyzeEvent"
											size="m"
											color={pathname === Routs.users.index ? COLOR_DEFAULT : COLOR_SUBDUED}
											onClick={null}
											style={null}
										/>
									</EuiFlexItem>
									<EuiFlexItem>
										<Link to={Routs.analytics.index}>
											<EuiText
												size="m"
												color={pathname === Routs.analytics.index ? COLOR_DEFAULT : COLOR_SUBDUED}
												grow={false}
												onClick={null}
												className={null}
												style={null}
											>
												Аналитика
											</EuiText>
										</Link>
									</EuiFlexItem>
								</EuiFlexGroup>
							</EuiFlexItem>
							: null
					}
				<EuiFlexItem>
					<EuiHorizontalRule size="full" margin="none"/>
				</EuiFlexItem>
			</EuiFlexGroup>
		</>
	)
}

export default memo(Menu)
