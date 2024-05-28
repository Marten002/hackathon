import React, { memo } from 'react'
import { EuiFieldSearch } from '@elastic/eui'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

const Search = ({ search, callback }) => {
	return (
		<>
			<EuiFieldSearch
				id={uuidv4()}
				name="search"
				placeholder="Поиск"
				value={search}
				isInvalid={false}
				fullWidth={true}
				autoComplete="false"
				isLoading={false}
				readOnly={false}
				onSearch={null}
				onChange={(event) => callback(_.get(event, 'target.value', ''))}
				incremental={false}
				compressed={true}
				isClearable={true}
				prepend={null}
				append={null}
				className={null}
				aria-label="search"
				data-test-subj={null}
			/>
		</>
	)
}

export default memo(Search)
