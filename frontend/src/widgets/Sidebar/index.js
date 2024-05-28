import React, { memo, useCallback, useState } from 'react'
import { EuiFlexGroup, EuiFlexItem, EuiPanel, EuiHorizontalRule } from '@elastic/eui'

import Search from './components/Search'
import Menu from './components/Menu'

import classes from './index.module.scss'

const Sidebar = () => {

	const [search, setSearch] = useState('')

	const handleCallbackSearch = useCallback((value) => {
		setSearch(value)
	}, [])

	return (
		<>
			<EuiPanel paddingSize="l" hasBorder={false} hasShadow={false}
				className={classes.container}>
				<EuiFlexGroup gutterSize="m" direction="column">
					<EuiFlexItem>
						<Search search={search} callback={handleCallbackSearch}/>
					</EuiFlexItem>
					<EuiFlexItem>
						<EuiHorizontalRule size="full" margin="none"/>
					</EuiFlexItem>
					<EuiFlexItem grow={false}>
						<Menu/>
					</EuiFlexItem>
				</EuiFlexGroup>
			</EuiPanel>
		</>
	)
}

export default memo(Sidebar)
