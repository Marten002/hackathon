export const Routs = {
	index: '/',
	auth: {
		authorization: {
			index: '/auth/sign-in'
		},
		registration: {
			index: '/auth/sign-up'
		}
	},
	project: {
		index: '/project',
		user: {
			add: {
				index: '/project/user/add'
			},
			change: {
				index: '/project/user/change'
			},
			remove: {
				index: '/project/user/remove'
			}
		}
	},
	events: {
		index: '/events',
		add: {
			index: '/events/create'
		},
		edit: {
			index: '/events/edit/:id',
			path: '/events/edit',
			participants: {
				add: {
					index: '/events/edit/participants/add/:id',
					path:  '/events/edit/participants/add'
				}
			}
		},
		remove: {
			index: '/events/remove'
		}
	},
	settings: {
		index: '/settings',
		authentication: {
			index: '/settings/2fa'
		},
		change: {
			password: {
				index: '/settings/change/password'
			},
			account: {
				index: '/settings/change/account'
			}
		}
	},
	users: {
		index: '/users'
	},
	analytics: {
		index: '/analytics'
	},
	forbidden: {
		index: '/forbidden'
	}
}
