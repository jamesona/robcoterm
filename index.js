(async terminal => {
	const { CommandHistory } = await import('./command-history.js')
	const commandHistory = new CommandHistory()
	
	const prompt = document.querySelector('.prompt')

	const { elementBuilder } = await import('./element.js')
	const scrollback = elementBuilder('div').class('scrollback').make()
	terminal.prepend(scrollback)


	const { buildCommands } = await import('./commands.js')
	const commands = await buildCommands({terminal, scrollback, elementBuilder})

	const { messages } = await import('./system-messages.js')
	commands.center(messages.headerMessage)
	commands.print(messages.trespasserMessage)
	commands.print(messages.hack)

	function scrollToBottom() {
		terminal.scrollTop = terminal.scrollHeight
	}

	function handleEntry(value) {
		const args = value.split(' ')
		const command = args.shift()

		commands.print(`>${value}`)

		try {
			commands[command](...args)
		} catch (e) {
			commands.print(`No command "${command}" found.`)
		}

		commands.print('\n')
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
