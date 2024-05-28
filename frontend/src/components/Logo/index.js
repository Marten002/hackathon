import React, { memo } from 'react'
import { EuiText } from '@elastic/eui'
import { Link } from 'react-router-dom'

import { COLOR_DEFAULT } from '../../constants/colors'

import { Routs } from '../../routs'

const Logo = ({ route }) => {
	return (
		<>
			<Link to={route ? route : Routs.index}>
				<EuiText
					size="m"
					color={COLOR_DEFAULT}
					grow={false}
					onClick={null}
					className={null}
					style={null}
				>
					<b>Central Dynamics</b>
				</EuiText>
			</Link>
		</>
	)
}

export default memo(Logo)
