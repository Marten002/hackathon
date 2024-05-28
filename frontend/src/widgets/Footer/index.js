import React, { memo } from 'react'
import { EuiFlexGroup, EuiFlexItem } from '@elastic/eui'

import Copyright from './components/Copyright'
import Theme from './components/Theme'
import Language from './components/Language'

const Footer = () => {
	return (
		<>
			<EuiFlexGroup gutterSize="m" justifyContent="flexBetween">
				<EuiFlexItem>
					<Copyright/>
				</EuiFlexItem>
				<EuiFlexItem grow={false}>
					<EuiFlexGroup gutterSize="m" alignItems="center">
						<EuiFlexItem>
							<Theme/>
						</EuiFlexItem>
						<EuiFlexItem>
							<Language/>
						</EuiFlexItem>
					</EuiFlexGroup>
				</EuiFlexItem>
			</EuiFlexGroup>
		</>
	)
}

export default memo(Footer)
