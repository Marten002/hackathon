import React, { memo } from 'react'
import { EuiText } from '@elastic/eui'
import { Link } from 'react-router-dom'

import { COLOR_SUBDUED } from '../../../../constants/colors'

import { Routs } from '../../../../routs'

const Project = () => {
	return (
		<>
			<Link to={Routs.project.index}>
				<EuiText
					size="s"
					color={COLOR_SUBDUED}
					grow={false}
					onClick={null}
					className={null}
					style={null}
				>
					Управление проектом
				</EuiText>
			</Link>
		</>
	)
}

export default memo(Project)
