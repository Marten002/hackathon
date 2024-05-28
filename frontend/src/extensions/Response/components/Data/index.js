import React, { memo, useEffect, useState } from 'react'
import { EuiCallOut, EuiModal, EuiModalBody, EuiModalHeader, EuiModalHeaderTitle } from '@elastic/eui'
import _ from 'lodash'

import { COLOR_SUCCESS, COLOR_WARNING } from '../../../../constants/colors'

import classes from './index.module.scss'

const Data = ({ data, callback }) => {
	// const history = useHistory()

	// const handleBack = () => {
	// 	if (!_.isNil(location)) {
	// 		if (_.toString(_.get(location, 'pathname', '')) !== 'sign-in') {
	// 			if (!_.isEmpty(_.get(location, 'search', ''))) {
	// 				// history.push(_.get(location, 'pathname', '') + _.get(location, 'search', ''))
	// 			}
	//
	// 			// history.goBack()
	// 		}
	// 	}
	// }

	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		setIsOpen(true)

		return () => {
			setIsOpen(false)
			callback()
		}
	}, [callback])

	return (
		<>
			{
				isOpen
					? <>
						<EuiModal
							onClose={() => callback()}
							className={classes.modal}
						>
							<EuiModalHeader>
								<EuiModalHeaderTitle>
									<b>Все хорошо</b>
								</EuiModalHeaderTitle>
							</EuiModalHeader>
							<EuiModalBody>
								{
									_.get(data, 'success', true)
										? <>
											<EuiCallOut
												title="succces"
												color={COLOR_SUCCESS}
												iconType="check"
												size="s"
											/>
										</>
										: <>
											<EuiCallOut
												title="warning"
												color={COLOR_WARNING}
												iconType="alert"
												size="s"
											/>
										</>
								}
							</EuiModalBody>
						</EuiModal>
					</>
					: null
			}
		</>
	)
}

export default memo(Data)
