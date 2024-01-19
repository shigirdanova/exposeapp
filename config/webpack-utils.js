const { HOST_APP } = require('./microfrontends/mfe-configurations')

const getRemoteEntry = (name, isDev) => {
	const { remoteName, remoteEntry, remoteEntryDev } = HOST_APP

	return {
		[remoteName]: isDev
		? `${remoteName}@${remoteEntryDev}/remoteEntry.js`
		: `${remoteName}@${remoteEntry}/remoteEntry.js`,
	}
  }

module.exports = {
	getRemoteEntry,
}
