import React, { memo, useCallback, useState } from 'react'
import { EuiFlexGroup, EuiFlexItem, EuiHorizontalRule, EuiIcon, EuiPopover, EuiText } from '@elastic/eui'
import { Link, useNavigate } from 'react-router-dom'

import { COLOR_DANGER, COLOR_DEFAULT, COLOR_SUBDUED } from '../../../../constants/colors'

import { Routs } from '../../../../routs'

import classes from './index.module.scss'
import { remove } from '../../../../utils/localStorage'

const Settings = () => {

	const navigate = useNavigate()

	const [isOpen, setIsOpen] = useState(false)

	const handleSetIsOpen = useCallback(() => {
		setIsOpen((prevState) => !prevState)
	}, [])

	const handleLogOut = useCallback(() => {
		remove({ key: 'token', withEvent: true })

		navigate(Routs.auth.authorization.index)
	}, [])

	return (
		<>
			<EuiPopover
				button={
					<>
						<EuiIcon
							aria-label="icon-grabOmnidirectional"
							type="grabOmnidirectional"
							size="l"
							color={COLOR_DEFAULT}
							onClick={handleSetIsOpen}
							style={null}
							className={classes.settings}
						/>
					</>
				}
				isOpen={isOpen}
				closePopover={handleSetIsOpen}
				anchorPosition="downCenter"
			>
				<EuiFlexGroup gutterSize="m" direction="column">
					<EuiFlexItem>
						<Link to={Routs.settings.index}>
							<EuiText
								size="m"
								color={COLOR_SUBDUED}
								grow={false}
								onClick={null}
								className={null}
								style={null}
							>
								Настройки
							</EuiText>
						</Link>
					</EuiFlexItem>
					<EuiFlexItem>
						<Link to={Routs.settings.authentication.index}>
							<EuiText
								size="m"
								color={COLOR_SUBDUED}
								grow={false}
								onClick={null}
								className={null}
								style={null}
							>
								Аутентификация
							</EuiText>
						</Link>
					</EuiFlexItem>
					<EuiFlexItem>
						<EuiHorizontalRule size="full" margin="none"/>
					</EuiFlexItem>
					<EuiFlexItem>
						<EuiText
							size="m"
							color={COLOR_DANGER}
							grow={false}
							onClick={() => handleLogOut()}
							className={classes.settings}
							style={null}
						>
							Выйти
						</EuiText>
					</EuiFlexItem>
				</EuiFlexGroup>
			</EuiPopover>
		</>
	)
}

export default memo(Settings)
