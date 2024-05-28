import React, { memo, useCallback, useMemo, useState } from 'react'
import { EuiInMemoryTable, EuiFlexItem, EuiFlexGroup, EuiButton, EuiIcon } from '@elastic/eui'
import _ from 'lodash'
import { useNavigate } from 'react-router-dom'
import { Routs } from '../../../../routs'
import { COLOR_DANGER, COLOR_SUCCESS } from '../../../../constants/colors'
import { ADMIN_ROLE } from '../../../../constants/roles'
import { shallowEqual, useSelector } from 'react-redux'
import { userSuccessSelectorReselect } from '../../../../redux/selectors/user'

const Participants = ({ data }) => {
    const navigate = useNavigate()
    const userSuccess = useSelector((state) => userSuccessSelectorReselect(state), shallowEqual)

    const columns = useMemo(() => {
        return [
            {
                field: 'email',
                name: 'E-mail',
                truncateText: true,
                sortable: true
            },
            {
                field: 'username',
                name: 'Имя',
                truncateText: true,
                sortable: true
            },
            {
                field: 'sex',
                name: 'Пол',
                truncateText: true,
                sortable: true,
                width: 150,
                render: (item) => {
                    return item === 'male' ? 'Мужской' : 'Женский'
                }
            },
            {
                field: 'email',
                name: 'Лайк мероприятию',
                align: 'center',
                width: 150,
                render: (item) => {
                    return _.get(data, 'likes', []).includes(item)
                        ? (
	<EuiIcon
		type="faceHappy"
		color={COLOR_SUCCESS}
		size="s"
                            />
                        )
                        : <EuiIcon
	type="faceSad"
	color={COLOR_DANGER}
	size="s"
                        />
                }
            }
        ]
    }, [])

    const toolsRight = [
	<EuiFlexGroup gutterSize="m" key="slakfjnbsdakjnflsadnfjnsakdnflj">
		<EuiFlexItem grow={false}>
			<EuiButton
				onClick={() => navigate(`${Routs.events.edit.participants.add.path}/${_.get(data, 'uuid', '')}`)}
				aria-label="addUser"
				size="s"
				fullWidth={true}
				fill={true}
                >
				Добавить
			</EuiButton>
		</EuiFlexItem>
	</EuiFlexGroup>
    ]
    
    const search = {
        toolsRight: [ADMIN_ROLE].includes(_.get(userSuccess, 'role', '')) ||
            _.get(data, 'user.email', '') === _.get(userSuccess, 'email', '')
                ? toolsRight
                : null,
        box: {
            incremental: true,
            schema: true,
            placeholder: 'Поиск...',
            compressed: true
        }
    }

    const sorting = useMemo(() => {
        return {
            sort: {
                field: 'name',
                direction: 'asc'
            }
        }
    }, [])

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
        totalItemCount: _.toInteger(_.size([])),
        pageSizeOptions: [10, 20, 50]
    })

    const handleSetPagination = useCallback((data) => {
        setPagination({
            ...pagination,
            pageIndex: _.get(data, 'page.index', 0),
            pageSize: _.get(data, 'page.size', 10)
        })
    }, [])

    return (
	<>
		<EuiInMemoryTable
			tableCaption="participants"
			items={_.get(data, 'participants', [])}
			itemId="uuid"
			noItemsMessage="Участники не найдены"
			columns={columns}
			search={search}
			sorting={sorting}
			loading={false}
			onTableChange={handleSetPagination}
			pagination={pagination}
			itemIdToExpandedRowMap={{}}
			rowProps={null}
			selection={null}
			isExpandable={false}
			isSelectable={false}
			hasActions={false}
			compressed={false}
        />
	</>
    )
}

export default memo(Participants)
