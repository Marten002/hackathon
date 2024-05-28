import React from 'react'
import { EuiFlexGroup, EuiFlexItem, EuiText } from '@elastic/eui'
import _ from 'lodash'

import { COLOR_DEFAULT } from '../../../../constants/colors'

import classes from './index.module.scss'
import { shallowEqual, useSelector } from 'react-redux'
import { userIsFetchingSelectorReselect, userSuccessSelectorReselect } from '../../../../redux/selectors/user'
import Response from '../../../../extensions/Response'

const User = () => {

	const userIsFetching = useSelector((state) => userIsFetchingSelectorReselect(state), shallowEqual)
	const userSuccess = useSelector((state) => userSuccessSelectorReselect(state), shallowEqual)

	return (
		<>
			<Response
				isLoading={userIsFetching}
				error={null}
				data={null}
				callback={null}
				isSmall={true}
			>
				<EuiFlexGroup gutterSize="s" alignItems="center">
					<EuiFlexItem>
						<EuiText
							size="m"
							color={COLOR_DEFAULT}
							grow={false}
							onClick={null}
							className={classes.text}
							style={null}
						>
							{_.get(userSuccess, 'username', '')}
						</EuiText>
					</EuiFlexItem>
					<EuiFlexItem grow={false}>
						<div className={classes.icon}>
							{_.slice(_.toArray(_.get(userSuccess, 'username', '')), 0, 1)}
						</div>
					</EuiFlexItem>
				</EuiFlexGroup>
			</Response>
		</>
	)
}

export default User
