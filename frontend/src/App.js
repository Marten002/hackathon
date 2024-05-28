import React, { Suspense, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { EuiThemeProvider } from '@elastic/eui'
import _ from 'lodash'

import moment from 'moment'
import localization from 'moment/locale/ru'

import Layout from './extensions/Layout'

import Settings from './pages/Settings'
import Authentication from './pages/Authentication'
import Account from './pages/Account'
import Registration from './pages/Registration'
import Authorization from './pages/Authorization'
import Events from './pages/Events'
import EventEdit from './pages/EventEdit'

import { useLocalStorageEffect } from './hooks/useLocalStorageEffect'

import { theme } from './constants/theme'
import { ADMIN_ROLE, ALL_ROLE, ANALYTIC_ROLE, MANAGER_ROLE } from './constants/roles'

import { Routs } from './routs'

import { get } from './utils/localStorage'

import './App.scss'
import SettingsChangePassword from './pages/SettingsChangePassword'
import Project from './pages/Project'
import PrivateRoute from './extensions/PrivateRoute'
import UserAdd from './pages/UserAdd'
import UserChange from './pages/UserChange'
import UserRemove from './pages/UserRemove'
import Forbidden from './pages/Forbidden'
import NotFound from './pages/NotFound'
import EventEditParticipantsAdd from './pages/EventEditParticipantsAdd'
import Analytics from './pages/Analytics'
import Loading from './components/Loader/Large'
import { getAsyncUser } from './redux/actions/user'
import { useDispatch } from 'react-redux'
import { decodeJWT } from './utils/jwt'
import EventAdd from './pages/EventAdd'
import Users from './pages/Users'

moment.updateLocale('ru', localization)

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		const token = decodeJWT()

		if (!_.isNil(_.get(token, 'uuid', null))) {
			dispatch(getAsyncUser(_.get(token, 'uuid', null)))
		}
	}, [])

	const [currentTheme, setCurrentTheme] = useState(get('theme', 'light'))

	useLocalStorageEffect((key, newValue) => {
		setCurrentTheme(newValue)
	}, ['theme'])

	return (
		<>
			<Suspense fallback={<Loading/>}>
				<EuiThemeProvider modify={theme} colorMode={currentTheme}>
					<div className={`app ${currentTheme === 'light' ? 'app--light' : 'app--dark'}`}>
						<Routes>
							<Route
								index={true}
								path={Routs.index}
								element={
									<PrivateRoute
										acceptForAuthorized={true}
										acceptForRoles={[ALL_ROLE]}
										next={Routs.index}
									>
										<Layout>
											<Events/>
										</Layout>
									</PrivateRoute>
								}
							/>
							<Route
								path={Routs.events.edit.index}
								element={
									<PrivateRoute
										acceptForAuthorized={true}
										acceptForRoles={[ALL_ROLE]}
										next={Routs.events.edit.index}
									>
										<Layout>
											<EventEdit/>
										</Layout>
									</PrivateRoute>
								}
							/>
							<Route
								path={Routs.events.add.index}
								element={
									<PrivateRoute
										acceptForAuthorized={true}
										acceptForRoles={[ADMIN_ROLE, MANAGER_ROLE, ANALYTIC_ROLE]}
										next={Routs.events.add.index}
									>
										<Layout>
											<EventAdd/>
										</Layout>
									</PrivateRoute>
								}
							/>
							<Route
								path={Routs.events.edit.participants.add.index}
								element={
									<PrivateRoute
										acceptForAuthorized={true}
										acceptForRoles={[ADMIN_ROLE, MANAGER_ROLE, ANALYTIC_ROLE]}
										next={Routs.events.edit.participants.add.index}
									>
										<Layout>
											<EventEditParticipantsAdd/>
										</Layout>
									</PrivateRoute>
								}
							/>
							<Route
								path={Routs.project.index}
								element={
									<PrivateRoute
										acceptForAuthorized={true}
										acceptForRoles={[ADMIN_ROLE]}
										next={Routs.project.index}
									>
										<Layout>
											<Project/>
										</Layout>
									</PrivateRoute>
								}
							/>
							<Route
								path={Routs.project.user.add.index}
								element={
									<PrivateRoute
										acceptForAuthorized={true}
										acceptForRoles={[ADMIN_ROLE]}
										next={Routs.project.user.add.index}
									>
										<Layout>
											<UserAdd/>
										</Layout>
									</PrivateRoute>
								}
							/>
							<Route
								path={Routs.project.user.change.index}
								element={
									<PrivateRoute
										acceptForAuthorized={true}
										acceptForRoles={[ADMIN_ROLE]}
										next={Routs.project.user.change.index}
									>
										<Layout>
											<UserChange/>
										</Layout>
									</PrivateRoute>
								}
							/>
							<Route
								path={Routs.project.user.remove.index}
								element={
									<PrivateRoute
										acceptForAuthorized={true}
										acceptForRoles={[ADMIN_ROLE]}
										next={Routs.project.user.remove.index}
									>
										<Layout>
											<UserRemove/>
										</Layout>
									</PrivateRoute>
								}
							/>
							<Route
								path={Routs.users.index}
								element={
									<PrivateRoute
										acceptForAuthorized={true}
										acceptForRoles={[ADMIN_ROLE, MANAGER_ROLE, ANALYTIC_ROLE]}
										next={Routs.users.index}
									>
										<Layout>
											<Users/>
										</Layout>
									</PrivateRoute>
								}
							/>
							<Route
								path={Routs.analytics.index}
								element={
									<PrivateRoute
										acceptForAuthorized={true}
										acceptForRoles={[ADMIN_ROLE, ANALYTIC_ROLE]}
										next={Routs.analytics.index}
									>
										<Layout>
											<Analytics/>
										</Layout>
									</PrivateRoute>
								}
							/>
							<Route
								path={Routs.settings.index}
								element={
									<PrivateRoute
										acceptForAuthorized={true}
										acceptForRoles={[ALL_ROLE]}
										next={Routs.settings.index}
									>
										<Layout>
											<Settings/>
										</Layout>
									</PrivateRoute>
								}
							/>
							<Route
								path={Routs.settings.authentication.index}
								element={
									<PrivateRoute
										acceptForAuthorized={true}
										acceptForRoles={[ALL_ROLE]}
										next={Routs.settings.authentication.index}
									>
										<Layout>
											<Authentication/>
										</Layout>
									</PrivateRoute>
								}
							/>
							<Route
								path={Routs.settings.change.password.index}
								element={
									<PrivateRoute
										acceptForAuthorized={true}
										acceptForRoles={[ALL_ROLE]}
										next={Routs.settings.change.password.index}
									>
										<Layout>
											<SettingsChangePassword/>
										</Layout>
									</PrivateRoute>
								}
							/>
							<Route
								path={Routs.settings.change.account.index}
								element={
									<PrivateRoute
										acceptForAuthorized={true}
										acceptForRoles={[ALL_ROLE]}
										next={Routs.settings.change.account.index}
									>
										<Layout>
											<Account/>
										</Layout>
									</PrivateRoute>
								}
							/>
							<Route
								path={Routs.auth.registration.index}
								element={<Registration/>}
							/>
							<Route
								path={Routs.auth.authorization.index}
								element={<Authorization/>}
							/>
							<Route
								path={Routs.forbidden.index}
								element={
									<Forbidden/>
								}
							/>
							<Route
								path="*"
								element={
									<NotFound/>
								}
							/>
						</Routes>
					</div>
				</EuiThemeProvider>
			</Suspense>
		</>
	)
}

export default App
