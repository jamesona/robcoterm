export class CommandHistory {
	constructor(history = []) {
		this.history = [...history]
		this.index = 0
	}

	insert(command) {
		this.history.push(command)
		this.index = this.history.length - 1
	}

	prev() {
		return this.history[this.index = Math.max(this.index - 1, 0)]
	}

	next() {
		return this.history[this.index = Math.min(this.index + 1, this.history.length)] || ''
	}

}
