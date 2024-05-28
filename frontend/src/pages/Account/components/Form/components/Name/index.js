import React, { memo, useCallback, useEffect, useState } from 'react'
import {
	EuiButton,
	EuiFieldText,
	EuiFlexGroup,
	EuiFlexItem,
	EuiFormRow,
	EuiModal,
	EuiModalBody,
	EuiModalHeader,
	EuiModalHeaderTitle,
	EuiPanel
} from '@elastic/eui'
import _ from 'lodash'


import useSettingsChangeNameMutation from './hooks/useSettingsChangeNameMutation'

import classes from './index.module.scss'
import Response from '../../../../../../extensions/Response'
import { v4 as uuidv4 } from 'uuid'
import { COLOR_PRIMARY } from '../../../../../../constants/colors'

const Name = ({ callback }) => {
	const {
		isLoading,
		data,
		error,
		mutate,
		reset
	} = useSettingsChangeNameMutation()

	const [config, setConfig] = useState({
		name: ''
	})

	const handleSetConfig = useCallback((name, value) => {
		setConfig((prevState) => ({
			...prevState,
			[name]: value
		}))
	}, [])

	const handleMutate = useCallback(() => {
		mutate({
			name: _.get(config, 'name', '')
		})
	}, [config])

	useEffect(() => {
		if (data) {
			reset()
			callback()
		}
	}, [data])

	return (
		<>
			<EuiModal onClose={callback} className={classes.modal}>
				<EuiModalHeader>
					<EuiModalHeaderTitle>
						<b>Изменение имени пользователя</b>
					</EuiModalHeaderTitle>
				</EuiModalHeader>
				<EuiModalBody>
					<EuiPanel paddingSize="l" hasShadow={false} hasBorder={true}>
						<Response
							isLoading={isLoading}
							error={error}
							data={null}
							callback={null}
							isSmall={true}
						>
							<EuiFlexGroup gutterSize="m" direction="column">
								<EuiFlexItem>
									<EuiFormRow
										label="Введите новое имя"
										display="rowCompressed"
										fullWidth={true}
										error={null}
										isInvalid={false}
										className={null}
									>
										<EuiFieldText
											name="name"
											placeholder="Иван Иванов"
											value={_.get(config, 'name', '')}
											onChange={(event) => handleSetConfig('name', _.get(event, 'target.value', ''))}
											readOnly={isLoading}
											disabled={false}
											compressed={true}
											fullWidth={true}
											required={false}
											isInvalid={false}
											append={null}
											data-test-subj={null}
										/>
									</EuiFormRow>
								</EuiFlexItem>
								<EuiFlexItem>
									<EuiButton
										key={uuidv4()}
										aria-label="submit"
										color={COLOR_PRIMARY}
										size="m"
										iconType={null}
										iconSide={null}
										fill={false}
										fullWidth={false}
										isDisabled={false}
										isLoading={false}
										onClick={() => handleMutate()}
										className={null}
										data-test-subj={null}
									>
										Отправить
									</EuiButton>
								</EuiFlexItem>
							</EuiFlexGroup>
						</Response>
					</EuiPanel>
				</EuiModalBody>
			</EuiModal>
		</>
	)
}

export default memo(Name)
