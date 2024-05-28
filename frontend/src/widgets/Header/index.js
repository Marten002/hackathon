import React, { memo } from 'react'
import { EuiFlexGroup, EuiFlexItem } from '@elastic/eui'
import _ from 'lodash'

import User from './components/User'
import Settings from './components/Settings'
import Logo from '../../components/Logo'
import Project from './components/Project'
import VerticalDivider from './components/VerticalDivider'
import Notifications from './components/Notifications'
import { shallowEqual, useSelector } from 'react-redux'
import { userSuccessSelectorReselect } from '../../redux/selectors/user'
import { ADMIN_ROLE } from '../../constants/roles'

const Header = () => {
	const userSuccess = useSelector((state) => userSuccessSelectorReselect(state), shallowEqual)

	return (
		<>
			<EuiFlexGroup gutterSize="m" justifyContent="flexBetween">
				<EuiFlexItem>
					<EuiFlexGroup gutterSize="m" alignItems="center">
						<EuiFlexItem grow={false}>
							<Logo/>
						</EuiFlexItem>
						<EuiFlexItem grow={false}>
							<VerticalDivider/>
						</EuiFlexItem>
						{
							[ADMIN_ROLE].includes(_.get(userSuccess, 'role', ''))
								? <EuiFlexItem grow={false}>
									<Project/>
								</EuiFlexItem>
								: null
						}
					</EuiFlexGroup>
				</EuiFlexItem>
				<EuiFlexItem grow={false}>
					<EuiFlexGroup gutterSize="m" alignItems="center">
						<EuiFlexItem grow={false}>
							<Notifications/>
						</EuiFlexItem>
						<EuiFlexItem grow={false}>
							<User/>
						</EuiFlexItem>
						<EuiFlexItem grow={false}>
							<Settings/>
						</EuiFlexItem>
					</EuiFlexGroup>
				</EuiFlexItem>
			</EuiFlexGroup>
		</>
	)
}

export default memo(Header)
