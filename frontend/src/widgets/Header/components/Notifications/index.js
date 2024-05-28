import React, { memo, useCallback, useState } from 'react'
import { EuiPopover, EuiIcon, EuiFlexGroup, EuiFlexItem, EuiText, EuiPanel } from '@elastic/eui'

import { COLOR_DEFAULT, COLOR_PRIMARY } from '../../../../constants/colors'

import classes from './index.module.scss'

const Notifications = () => {

	const [isOpen, setIsOpen] = useState(false)

	const handleSetIsOpen = useCallback(() => {
		setIsOpen((prevState) => !prevState)
	}, [])

	return (
		<>
			<EuiPopover
				button={
					<>
						<EuiIcon
							aria-label="icon-bell"
							type="bell"
							size="m"
							color={COLOR_PRIMARY}
							onClick={handleSetIsOpen}
							style={null}
							className={classes.notifications}
						/>
					</>
				}
				isOpen={isOpen}
				closePopover={handleSetIsOpen}
				anchorPosition="downCenter"
			>
				<EuiFlexGroup gutterSize="m" direction="column">
					<EuiFlexItem>
						<EuiText
							size="s"
							color={COLOR_DEFAULT}
							grow={false}
							onClick={null}
							className={null}
							style={null}
						>
							Уведомления
						</EuiText>
					</EuiFlexItem>
					<EuiFlexItem>
						<EuiFlexGroup gutterSize="m" direction="column">
							<EuiFlexItem>
								<EuiPanel paddingSize="none" hasShadow={false} hasBorder={true}>
									1
								</EuiPanel>
							</EuiFlexItem>
							<EuiFlexItem>
								<EuiPanel paddingSize="none" hasShadow={false} hasBorder={true}>
									2
								</EuiPanel>
							</EuiFlexItem>
						</EuiFlexGroup>
					</EuiFlexItem>
				</EuiFlexGroup>
			</EuiPopover>
		</>
	)
}

export default memo(Notifications)
