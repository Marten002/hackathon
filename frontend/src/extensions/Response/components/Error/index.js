import React, { memo, useEffect, useState } from 'react'
import _ from 'lodash'
import { EuiCallOut, EuiLink, EuiModal, EuiModalBody, EuiModalHeader, EuiModalHeaderTitle, EuiText } from '@elastic/eui'

import { COLOR_DANGER, COLOR_PRIMARY } from '../../../../constants/colors'

import classes from './index.module.scss'

const Error = ({ data }) => {
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		setIsOpen(true)

		return () => {
			setIsOpen(false)

			if (_.toString(_.get(data, 'type', '')) === 'automatically') {
				_.invoke(data, 'refetch')
			} else {
				_.invoke(data, 'reset')
			}
		}
	}, [])

	return (
		<>
			{
				isOpen
					? <>
						<EuiModal
							onClose={() => _.invoke(data, 'reset')}
							className={classes.modal}
						>
							<EuiModalHeader>
								<EuiModalHeaderTitle>
									<b>Ошибка</b>
								</EuiModalHeaderTitle>
							</EuiModalHeader>
							<EuiModalBody>
								<EuiCallOut
									title={_.get(data, 'message', '')}
									color={COLOR_DANGER}
									iconType="alert"
									size="s"
								>
									{
										_.get(data, 'type', '') === 'automatically'
											? <>
												<EuiLink
													type="button"
													color={COLOR_PRIMARY}
													onClick={null}
												>
													<EuiText
														size="m"
														color={null}
														grow={false}
														onClick={() => _.invoke(data, 'refetch')}
														className="cursor-pointer"
														style={null}
													>
														Перезапросить данные
													</EuiText>
												</EuiLink>
											</>
											: <>
												<>
													<EuiLink
														type="button"
														color={COLOR_PRIMARY}
														onClick={null}
													>
														<EuiText
															size="m"
															color={null}
															grow={false}
															onClick={() => _.invoke(data, 'reset')}
															className="cursor-pointer"
															style={null}
														>
															Сбросить данные
														</EuiText>
													</EuiLink>
												</>
											</>
									}
								</EuiCallOut>
							</EuiModalBody>
						</EuiModal>
					</>
					: null
			}
		</>
	)
}

export default memo(Error)
