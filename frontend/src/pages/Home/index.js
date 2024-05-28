import React, { memo } from 'react'
import { EuiFlexGroup, EuiFlexItem, EuiTitle } from '@elastic/eui'

const Home = () => {
	return (
		<>
			<EuiFlexGroup gutterSize="m" direction="column">
				<EuiFlexItem>
					<EuiTitle size="m">
						<b>Мероприятия</b>
					</EuiTitle>
				</EuiFlexItem>
				<EuiFlexItem>
					2
				</EuiFlexItem>
			</EuiFlexGroup>
		</>
	)
}

export default memo(Home)
