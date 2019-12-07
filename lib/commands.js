const colors = [
	'amber',
	'light-amber',
	'green-1',
	'green-2',
	'green-3',
	'apple-2',
	'apple-2c',
	'robco'
]

const fonts = [
	'vt232',
	'space-mono',
	'share-tech-mono',
	'ibm-plex-mono',
	'fixedsys'
]

export async function buildCommands({terminal, scrollback, prompt}) {
	const { NetworkNavigator } = await import('/lib/network.js')
	const { network } = await import('/data/network/index.js')
	const networkNavigator = new NetworkNavigator(network)

	const commands = {
		async clear() {
			scrollback.innerHTML = ''
		},
		async reset() {
			commands.clear()
		},
		async echo(...args) {
			return args.join(' ')
		},
		async setcolor(color) {
			if (colors.includes(color)) {
				colors.forEach(listColor => terminal.classList.remove(listColor))
				terminal.classList.add(color)
			} else {
				return `Color must be one of: ${colors.join(' ')}`
			}
		},
		async setfont(font) {
			if (fonts.includes(font)) {
				fonts.forEach(listFont => terminal.classList.remove(listFont))
				terminal.classList.add(font)
			} else {
				return `Font must be one of: ${fonts.join(' ')}`
			}
		},
		async ls() {
			return networkNavigator.currentHost.listCurrentDirectory().join(' ') || 'No Files'
		},
		async dir(...args) {
			return await commands.ls(...args)
		},
		async cd(...args) {
			return networkNavigator.currentHost.openDirectory(...args)
		},
		async cat(filename) {
			return networkNavigator.currentHost.readFile(filename)
		},
		async read(filename) {
			return networkNavigator.currentHost.readFile(filename)
		},
		async open(name) {
			const directoryError = networkNavigator.currentHost.openDirectory(name)
			if (directoryError) return networkNavigator.currentHost.readFile(name)
		},
		async remote(command, ...otherParams) {
			const subCommands = {
				async list() {
					const list = (await networkNavigator.list()) || []

					return `Available connections: ${list.join(' ') || 'None'}`
				},
				async connect(node) {
					const message = await networkNavigator.connect(node)
					prompt.dataset.host = networkNavigator.activeNode
					return message
				},
				async disconnect() {
					delete prompt.dataset.host
					return await networkNavigator.disconnect()
				}
			}
			
			if (subCommands[command]) {
				return await subCommands[command](...otherParams)
			} else {
				return await subCommands.list()
			}
		},
		async help(command) {
			switch (command) {
				case 'echo': {
					return 'Print arguments as new line. Example: print test'
				}
				default: {
					return `Available commands: ${Object.keys(commands).join(' ')}`
				}
			}
		},
		async info() {

		}
	}

	return commands
}
