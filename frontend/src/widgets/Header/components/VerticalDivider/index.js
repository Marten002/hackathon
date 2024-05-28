import React, { memo } from 'react'
import clsx from 'clsx'

import classes from './index.module.scss'

const VerticalDivider = () => {
	return (
		<>
			<div className={clsx(classes.divider)}/>
		</>
	)
}

export default memo(VerticalDivider)
