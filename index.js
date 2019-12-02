(async terminal => {
	const { CommandHistory } = await import('./command-history.js')
	const commandHistory = new CommandHistory()
	
	const { elementBuilder } = await import('./element.js')
	terminal.prepend(elementBuilder('div').class('scrollback').make())

	const scrollback = document.querySelector('.scrollback')
	const prompt = document.querySelector('.prompt')

	const scrollToBottom = () => terminal.scrollTop = terminal.scrollHeight

	document.addEventListener('keydown', event => {
		event.preventDefault()
		event.stopImmediatePropagation()

		const { key, code } = event

		if ('-abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.includes(key)) {
			prompt.innerHTML += key
		} else {
			const { innerHTML } = prompt

			switch (key) {
				case 'Enter': {
					commandHistory.insert(innerHTML)
					prompt.innerHTML = null
					handleEntry(innerHTML)
					break
				}
				case 'Backspace': {
					prompt.innerHTML = innerHTML.slice(0, -1)
					break
				}
				case 'ArrowUp': {
					prompt.innerHTML = commandHistory.prev()
					break
				}
				case 'ArrowDown': {
					prompt.innerHTML = commandHistory.next()
					break
				}
				default: {
					debugger
				}
			}
		}

		scrollToBottom()
	})

	const commands = {
		print(options, ...args) {
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

	const handleEntry = value => {
		const args = value.split(' ')
		const command = args.shift()

		try {
			commands[command](...args)
		} catch (e) {
			commands.print(`No command "${command}" found.`)
		}
	}

	const { headerMessage, trespasserMessage } = await import('./system-messages.js')
	commands.center(headerMessage)
	commands.print(trespasserMessage)
})(document.querySelector('.terminal'))
