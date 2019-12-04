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

export async function buildCommands({terminal, scrollback, filesystem}) {

	const commands = {
		clear() {
			scrollback.innerHTML = ''
		},
		reset() {
			commands.clear()
		},
		echo(...args) {
			return args.join(' ')
		},
		setcolor(color) {
			if (colors.includes(color)) {
				colors.forEach(listColor => terminal.classList.remove(listColor))
				terminal.classList.add(color)
			} else {
				return `Color must be one of: ${colors.join(' ')}`
			}
		},
		setfont(font) {
			if (fonts.includes(font)) {
				fonts.forEach(listFont => terminal.classList.remove(listFont))
				terminal.classList.add(font)
			} else {
				return `Font must be one of: ${fonts.join(' ')}`
			}
		},
		ls() {
			return filesystem.listCurrentDirectory().join(' ')
		},
		dir(...args) {
			return commands.ls(...args)
		},
		cd(...args) {
			return filesystem.openDirectory(...args)
		},
		cat(filename) {
			return filesystem.readFile(filename)
		},
		read(filename) {
			return filesystem.readFile(filename)
		},
		open(name) {
			const directoryError = filesystem.openDirectory(name)
			if (directoryError) return filesystem.readFile(name)
		},
		remote() {

		},
		help(command) {
			switch (command) {
				case 'echo': {
					return 'Print arguments as new line. Example: print test'
				}
				default: {
					return `Available commands: ${Object.keys(commands).join(' ')}`
				}
			}
		},
		info() {

		}
	}

	return commands
}
