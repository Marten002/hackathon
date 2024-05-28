import React, { memo } from 'react'
import {
	EuiCard,
	EuiFlexGroup,
	EuiFlexItem,
	EuiModal,
	EuiModalBody,
	EuiModalHeader,
	EuiModalHeaderTitle
} from '@elastic/eui'

import classes from './index.module.scss'
import { useTranslation } from 'react-i18next'

const Modal = ({ callback }) => {

	const { i18n } = useTranslation()

	const handleChangeLanguage = (value) => {
		i18n.changeLanguage(value)
	}

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
							<EuiCard
								icon={null}
								title="Русский"
								isDisabled={false}
								description="Использовать вариант интерфейса в русской локализации"
								onClick={() => handleChangeLanguage('ru')}
							/>
						</EuiFlexItem>
						<EuiFlexItem>
							<EuiCard
								icon={null}
								title="English"
								isDisabled={false}
								description="Use interface option in English localization"
								onClick={() => handleChangeLanguage('en')}
							/>
						</EuiFlexItem>
					</EuiFlexGroup>
				</EuiModalBody>
			</EuiModal>
		</>
	)
}

export default memo(Modal)
