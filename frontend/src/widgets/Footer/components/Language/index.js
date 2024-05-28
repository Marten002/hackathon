import React, { memo, useCallback, useState } from 'react'
import { EuiFlexGroup, EuiFlexItem, EuiIcon, EuiText } from '@elastic/eui'

import Modal from './components/Modal'

import { COLOR_SUBDUED } from '../../../../constants/colors'

import classes from './index.module.scss'

const Language = () => {

	const [isOpen, setIsOpen] = useState(false)

	const handleSetIsOpen = useCallback(() => {
		setIsOpen((prevState) => !prevState)
	}, [])

	const handleCallback = useCallback(() => {
		setIsOpen(false)
	}, [])

	return (
		<>
			<EuiFlexGroup gutterSize="xs" alignItems="center" onClick={handleSetIsOpen} className={classes.theme}>
				<EuiFlexItem grow={false}>
					<EuiIcon
						aria-label="icon-globe"
						type="globe"
						size="m"
						color={COLOR_SUBDUED}
						onClick={null}
						style={null}
						className={null}
					/>
				</EuiFlexItem>
				<EuiFlexItem>
					<EuiText
						size="s"
						color={COLOR_SUBDUED}
						grow={false}
						onClick={null}
						className={null}
						style={null}
					>
						Язык
					</EuiText>
				</EuiFlexItem>
			</EuiFlexGroup>
			{
				isOpen
					? <>
						<Modal callback={handleCallback}/>
					</>
					: null
			}
		</>
	)
}

export default memo(Language)
