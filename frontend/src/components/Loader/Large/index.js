import React, { memo } from 'react'
import { EuiProgress } from '@elastic/eui'

import { COLOR_PRIMARY } from '../../../constants/colors'

const Loading = () => {
	return (
		<>
			<EuiProgress
				size="xs"
				color={COLOR_PRIMARY}
			/>
		</>
	)
}

export default memo(Loading)
