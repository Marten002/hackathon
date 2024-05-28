import { createSelector } from 'reselect'

const authIsFetchingSelector = (state) => {
	return state.auth.authIsFetching
}

export const authIsFetchingSelectorReselect = createSelector(
	authIsFetchingSelector,
	(authIsFetching) => authIsFetching
)

const authSuccessSelector = (state) => {
	return state.auth.authSuccess
}

export const authSuccessSelectorReselect = createSelector(
	authSuccessSelector,
	(authSuccess) => authSuccess
)

const authFailureSelector = (state) => {
	return state.auth.authFailure
}

export const authFailureSelectorReselect = createSelector(
	authFailureSelector,
	(authFailure) => authFailure
)

const registrationIsFetchingSelector = (state) => {
	return state.auth.registrationIsFetching
}

export const registrationIsFetchingSelectorReselect = createSelector(
	registrationIsFetchingSelector,
	(registrationIsFetching) => registrationIsFetching
)

const registrationSuccessSelector = (state) => {
	return state.auth.registrationSuccess
}

export const registrationSuccessSelectorReselect = createSelector(
	registrationSuccessSelector,
	(registrationSuccess) => registrationSuccess
)

const registrationFailureSelector = (state) => {
	return state.auth.registrationFailure
}

export const registrationFailureSelectorReselect = createSelector(
	registrationFailureSelector,
	(registrationFailure) => registrationFailure
)

const authIsExpiredSelector = (state) => {
	return state.auth.authIsExpired
}

export const authIsExpiredSelectorReselect = createSelector(
	authIsExpiredSelector,
	(authIsExpired) => authIsExpired
)

const outIsFetchingSelector = (state) => {
	return state.auth.outIsFetching
}

export const outIsFetchingSelectorReselect = createSelector(
	outIsFetchingSelector,
	(outIsFetching) => outIsFetching
)

const outSuccessSelector = (state) => {
	return state.auth.outSuccess
}

export const outSuccessSelectorReselect = createSelector(
	outSuccessSelector,
	(outSuccess) => outSuccess?.result
)

const outFailureSelector = (state) => {
	return state.auth.outFailure
}

export const outFailureSelectorReselect = createSelector(
	outFailureSelector,
	(outFailure) => outFailure
)
