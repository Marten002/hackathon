import React, { memo, useEffect, useMemo, useState } from 'react'
import { EuiButtonIcon, EuiComboBox, EuiFlexGroup, EuiFlexItem, EuiFormRow, EuiIcon, EuiText, EuiBadge } from '@elastic/eui'
import { COLOR_DANGER, COLOR_SUCCESS } from '../../../../../../constants/colors'
import useEventMutation from '../../hooks/useEventMutation'
import _ from 'lodash'
import { shallowEqual, useSelector } from 'react-redux'
import { userSuccessSelectorReselect } from '../../../../../../redux/selectors/user'
import { ADMIN_ROLE } from '../../../../../../constants/roles'

const EditableCombobox = ({ config, name, callback, label }) => {
    const [mode, setMode] = useState('watch')
    const [valueChanged, setValueChanged] = useState([])
    const { data, mutate, reset, isLoading } = useEventMutation()

    const userSuccess = useSelector((state) => userSuccessSelectorReselect(state), shallowEqual)
    const canEdit = useMemo(() => {
        return _.get(config, 'user.email', '') === _.get(userSuccess, 'email', '') ||
            _.get(userSuccess, 'role', '') === ADMIN_ROLE
    }, [userSuccess, config])

    const handleSave = () => {
        if (canEdit) {
            mutate({
                payload: {
                    uuid: _.get(config, 'uuid', ''),
                    [name]: valueChanged
                }
            })
        }
    }

    const handleCancel = () => {
        callback(name, _.get(config, name, ''))
        setMode('watch')
    }

    useEffect(() => {
        if (data) {
            callback(name, valueChanged)
            reset()
            setMode('watch')
        }
    }, [data])

    useEffect(() => {
        setValueChanged(_.get(config, name, []))
    }, [mode])

    const onCreateOption = (searchValue) => {
        const normalizedSearchValue = searchValue.trim()

        if (!normalizedSearchValue) {
            return
        }

        setValueChanged([...valueChanged, normalizedSearchValue])
    }

    return (
	<>
		<EuiFormRow label={label} fullWidth={true} className="w-100p">
			{
                    mode === 'watch'
                        ? <EuiFlexGroup alignItems="center" gutterSize="s" className="editableField">
	<EuiFlexItem grow={false}>
		<EuiText>
			{
                _.size(_.get(config, name, [])) > 0
                    ? _.get(config, name, []).map(item => (
	<EuiBadge key={item}>
		{item}
	</EuiBadge>
                    ))
                    : null
            }
		</EuiText>
	</EuiFlexItem>
	{
                                canEdit
                                    ? <EuiFlexItem grow={false}>
	<EuiIcon
		className="editableFieldIcon c-pointer"
		type="documentEdit"
		onClick={() => setMode('edit')}
                                        />
                                    </EuiFlexItem>
                                    : null
                            }
	
                        </EuiFlexGroup>
                        : <EuiFlexGroup gutterSize="s">
	<EuiFlexItem grow={true}>
		<EuiComboBox
			value={valueChanged}
			onCreateOption={onCreateOption}
			selectedOptions={valueChanged.map((item) => ({ label: item, value: item }))}
			onChange={(selectedOptions) => setValueChanged(selectedOptions.map(item => item.value))}
			customOptionText="Нажмите Enter чтобы добавить тэг {searchValue}"
                                />
	</EuiFlexItem>
	<EuiFlexItem grow={false}>
		<EuiFlexGroup alignItems="center" gutterSize="none">
			<EuiFlexItem>
				<EuiButtonIcon
					iconType="save"
					color={COLOR_SUCCESS}
					className="c-pointer"
					onClick={handleSave}
					isLoading={isLoading}
                                        />
			</EuiFlexItem>
			<EuiFlexItem>
				<EuiButtonIcon
					iconType="cross"
					color={COLOR_DANGER}
					className="c-pointer"
					onClick={handleCancel}
                                        />
			</EuiFlexItem>
		</EuiFlexGroup>
	</EuiFlexItem>
                        </EuiFlexGroup>
                }
		</EuiFormRow>
	</>
    )
}

export default memo(EditableCombobox)