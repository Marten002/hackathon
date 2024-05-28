import React, { memo } from 'react'
import { EuiText } from '@elastic/eui'

import { COLOR_SUBDUED } from '../../../../constants/colors'

const Copyright = () => {
	return (
		<>
			<EuiText
				size="xs"
				color={COLOR_SUBDUED}
				grow={false}
				onClick={null}
				className={null}
				style={null}
			>
				&copy; 2023–2023 Central Dynamics, v.1.0.0
			</EuiText>
		</>
	)
}

export default memo(Copyright)
