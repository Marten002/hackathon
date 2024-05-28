import React, { memo, useCallback } from 'react'
import {
	EuiCard,
	EuiFlexGroup,
	EuiFlexItem,
	EuiModal,
	EuiModalBody,
	EuiModalHeader,
	EuiModalHeaderTitle,
	EuiThemeProvider
} from '@elastic/eui'

import { changeTheme } from './utils/changeTheme'

import classes from './index.module.scss'

const Modal = ({ callback }) => {

	const handleChangeTheme = useCallback((theme) => {
		changeTheme(theme)

		callback()
	}, [])

	return (
		<>
			<EuiModal onClose={callback} className={classes.modal}>
				<EuiModalHeader>
					<EuiModalHeaderTitle>
						<b>Тема интерфейса</b>
					</EuiModalHeaderTitle>
				</EuiModalHeader>
				<EuiModalBody>
					<EuiFlexGroup gutterSize="m">
						<EuiFlexItem>
							<EuiThemeProvider colorMode="light">
								<EuiCard
									icon={null}
									title="Светлая"
									isDisabled={false}
									description="Пример текста при использовании светлой темы"
									onClick={() => handleChangeTheme('light')}
								/>
							</EuiThemeProvider>
						</EuiFlexItem>
						<EuiFlexItem>
							<EuiThemeProvider colorMode="dark">
								<EuiCard
									icon={null}
									title="Темная"
									isDisabled={false}
									description="Пример текста при использовании темной темы"
									onClick={() => handleChangeTheme('dark')}
								/>
							</EuiThemeProvider>
						</EuiFlexItem>
					</EuiFlexGroup>
				</EuiModalBody>
			</EuiModal>
		</>
	)
}

export default memo(Modal)
