export async function buildCommands(scrollback, elementBuilder) {
	const commands = {
		print(options, ...args) {
			const scrollback = document.querySelector('.scrollback')
			const { classList } = options

			if (typeof options !== 'object') {
				args.unshift(options)
			}

			scrollback.appendChild(elementBuilder('p').contents(args.join(' ')).class(...(classList || [])).make())
		},
		echo(...args) {
			commands.print(args.join(' '))
		},
		center(...args) {
			commands.print({ classList: ['center'] }, ...args)
		},
		clear() {
			const scrollback = document.querySelector('.scrollback')
			scrollback.innerHTML = ''
		},
		reset() {
			commands.clear()
		},
		setcolor(color) {
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

			if (colors.includes(color)) {
				colors.forEach(listColor => terminal.classList.remove(listColor))
				terminal.classList.add(color)
			} else {
				commands.print(`Color must be one of: ${colors.join(' ')}`)
			}
		},
		setfont(font) {
			const fonts = [
				'vt232',
				'space-mono',
				'share-tech-mono',
				'ibm-plex-mono',
				'fixedsys'
			]

			if (fonts.includes(font)) {
				fonts.forEach(listFont => terminal.classList.remove(listFont))
				terminal.classList.add(font)
			} else {
				commands.print(`Font must be one of: ${fonts.join(' ')}`)
			}
		}
	}

	return commands
}
