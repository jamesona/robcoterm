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
		this.index = Math.max(this.index - 1, 0)
		return this.history[this.index] || ''
	}

	next() {
		this.index = Math.min(this.index + 1, this.history.length)
		return this.history[this.index] || ''
	}

}
