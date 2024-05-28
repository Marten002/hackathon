import React, { memo, useCallback, useState } from 'react'
import { EuiModal, EuiModalBody, EuiModalHeader, EuiModalHeaderTitle, EuiPanel } from '@elastic/eui'

import Submit from './components/Submit'
import Check from './components/Check'

import classes from './index.module.scss'

const Modal = ({ callback }) => {

	const [stage, setStage] = useState('submit')

	const handleSetStage = useCallback((value) => {
		setStage(value)
	}, [])

	return (
		<>
			<EuiModal onClose={callback} className={classes.modal}>
				<EuiModalHeader>
					<EuiModalHeaderTitle>
						<b>Подключение 2FA</b>
					</EuiModalHeaderTitle>
				</EuiModalHeader>
				<EuiModalBody>
					<EuiPanel paddingSize="l" hasShadow={false} hasBorder={true}>
						{
							stage === 'submit'
								? <>
									<Submit callback={handleSetStage}/>
								</>
								: <>
									<Check callback={callback}/>
								</>
						}
					</EuiPanel>
				</EuiModalBody>
			</EuiModal>
		</>
	)
}

export default memo(Modal)
