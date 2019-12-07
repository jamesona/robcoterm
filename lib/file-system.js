

export class FileSystem {
	constructor(tree = {}) {
		this.tree = tree
		this._path = []
	}

	get path() {
		return '/'+this._path.join('/')
	}

	get currentDirectory() {
		const path = [...this._path]
		let currentDirectory = this.tree

		while (path.length) {
			currentDirectory = currentDirectory[path.shift()]
		}

		return currentDirectory
	}

	openDirectory(directory) {
		if (directory === '..') {
			this._path.pop()
		} else if (this.listSubdirectories().includes(directory)) {
			this._path.push(directory)
		} else {
			return 'Directory not found'
		}
	}

	listFiles() {
		const { currentDirectory } = this
		return Object.keys(currentDirectory).filter(key => typeof currentDirectory[key] !== 'object')
	}

	listSubdirectories() {
		const { currentDirectory } = this
		return Object.keys(currentDirectory).filter(key => typeof currentDirectory[key] === 'object')
	}

	listCurrentDirectory() {
		return [...this.listSubdirectories(), ...this.listFiles()]
	}

	readFile(fileName) {
		return this.currentDirectory[fileName] || 'File not found'
	}
}
