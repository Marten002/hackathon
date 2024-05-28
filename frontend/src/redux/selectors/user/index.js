import { createSelector } from 'reselect'

const userIsFetchingSelector = (state) => {
	return state.user.userIsFetching
}

export const userIsFetchingSelectorReselect = createSelector(
	userIsFetchingSelector,
	(userIsFetching) => userIsFetching
)

const userSuccessSelector = (state) => {
	return state.user.userSuccess
}

export const userSuccessSelectorReselect = createSelector(
	userSuccessSelector,
	(userSuccess) => userSuccess
)

const userFailureSelector = (state) => {
	return state.user.userFailure
}

export const userFailureSelectorReselect = createSelector(
	userFailureSelector,
	(userFailure) => userFailure
)
