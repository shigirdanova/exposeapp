/*
type MfeModel = {
	type: 'module' | 'component'
	remoteName: string
	remoteEntry: string
	remoteEntryDev: string
	exposedComponent?: string | string[]
	exposedModule?: string | string[]
}
*/

const HOST_APP = {
		type: 'module',
    remoteName: 'hostApp',
    remoteEntry: 'https://hostapp-def-ithub.stg01.samoletgroup.ru',
    exposedModule: ['./HomePage.vue'],
    remoteEntryDev: 'http://localhost:3001',
}

module.exports = {
	HOST_APP,
}
