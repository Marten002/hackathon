import React, { memo } from 'react'
import { EuiLoadingSpinner } from '@elastic/eui'

const Loading = () => {
	return (
		<>
			<EuiLoadingSpinner
				size="m"
			/>
		</>
	)
}

export default memo(Loading)
