(async terminal => {
	const prompt = document.querySelector('.prompt')

	const { CommandHistory } = await import('./command-history.js')
	const commandHistory = new CommandHistory()

	const { elementBuilder } = await import('./element.js')
	const scrollback = elementBuilder('div').class('scrollback').make()
	terminal.prepend(scrollback)


	const { FileSystem } = await import('./file-system.js')
	const filesystem = new FileSystem()
	
	const { buildCommands } = await import('./commands.js')
	const commands = await buildCommands({terminal, scrollback, filesystem})

	const print = (options, ...args) => {
		const { classList } = options || {}

		if (typeof options !== 'object') {
			args.unshift(options)
		}

		scrollback.appendChild(elementBuilder('p').contents(args.join(' ')).class(...(classList || [])).make())
	}

	const center = (...args) => {
		print({ classList: ['center'] }, ...args)
	}

	const { messages } = await import('./system-messages.js')
	center(messages.headerMessage)
	print(messages.trespasserMessage)
	print(messages.hack)

	function scrollToBottom() {
		terminal.scrollTop = terminal.scrollHeight
	}

	function handleEntry(value) {
		const args = value.split(' ')
		const command = args.shift()

		

		print(`>${value}`)

		if (command && commands[command]) {
			try {
				print(commands[command](...args))
			} catch (e) {
				debugger
			}
		} else {
			print(`No command "${command}" found. Try "help" for a list of options.`)
		}

		print('\n')
	}

	function handleKey(event) {
		event.preventDefault()
		event.stopImmediatePropagation()

		const { key, code } = event
		const textEntryKeys = '.-abcdefghijklmnopqrstuvwxyz_ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 '

		if (textEntryKeys.includes(key)) {
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
	}

	document.addEventListener('keydown', handleKey)
})(document.querySelector('.terminal'))
