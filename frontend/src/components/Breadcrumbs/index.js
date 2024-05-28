import React, { memo } from 'react'
import { EuiBreadcrumbs, EuiPanel, EuiSpacer } from '@elastic/eui'
import _ from 'lodash'

import { COLOR_SUBDUED } from '../../constants/colors'

import useBreadcrumbsNormalize from './hooks/useBreadcrumbsNormalize'

const Breadcrumbs = ({ breadcrumbs }) => {

	const dataNormalize = useBreadcrumbsNormalize(breadcrumbs)

	return (
		<>
			{
				_.size(dataNormalize) > 0
					? <>
						<EuiPanel paddingSize="s" color={COLOR_SUBDUED} hasShadow={false} hasBorder={false}>
							<EuiBreadcrumbs
								responsive={{
									xs: 1,
									s: 3,
									m: 5,
									xl: 6
								}}
								breadcrumbs={dataNormalize}
								max={null}
								aria-label="Breadcrumbs"
							/>
						</EuiPanel>
						<EuiSpacer size="m"/>
					</>
					: null
			}
		</>
	)
}

export default memo(Breadcrumbs)
