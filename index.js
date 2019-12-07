(async terminal => {
	const prompt = document.querySelector('.prompt')

	const { CommandHistory } = await import('./lib/command-history.js')
	const commandHistory = new CommandHistory()

	const { elementBuilder } = await import('./lib/element.js')
	const scrollback = elementBuilder('div').class('scrollback').make()
	terminal.prepend(scrollback)
	
	const { buildCommands } = await import('./lib/commands.js')
	const commands = await buildCommands({terminal, scrollback, prompt})

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

	const { messages } = await import('./data/system-messages.js')
	center(messages.headerMessage)
	print(messages.trespasserMessage)
	print(messages.hack)

	function scrollToBottom() {
		terminal.scrollTop = terminal.scrollHeight
	}

	async function handleEntry(value) {
		const args = value.split(' ')
		const command = args.shift()

		

		print(`>${value}`)

		if (command && commands[command]) {
			try {
				print(await commands[command](...args))
			} catch (e) {
				debugger
			}
		} else {
			print(`No command "${command}" found. Try "help" for a list of options.`)
		}

		print('\n')
		scrollToBottom()
	}

	async function handleKey(event) {
		const { key, code } = event
		const textEntryKeys = '.-abcdefghijklmnopqrstuvwxyz_ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 '

		const handlers = {
			async Enter(input) {
				commandHistory.insert(input)
				handleEntry(input)

				return null
			},
			async Backspace(input) {
				return input.slice(0, -1)
			},
			async ArrowUp() {
				return commandHistory.prev()
			},
			async ArrowDown() {
				return commandHistory.next()
			}
		}

		if (textEntryKeys.includes(key)) {
			prompt.innerHTML += key
		} else if (handlers[key]) {
			event.preventDefault()
			event.stopImmediatePropagation()

			const { innerHTML } = prompt

			prompt.innerHTML = await handlers[key](innerHTML)
		}
	}

	document.addEventListener('keydown', handleKey)
})(document.querySelector('.terminal'))
