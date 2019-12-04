const fileTree = {
	'file-1': 'the contents of file 1',
	'file-2': 'the contents of file 2',
	'file-3': 'the contents of file 3',
	'test': {
		foo: 'bar',
		fizz: 'buzz'
	}
}

export class FileSystem {
	constructor() {
		this._path = []
	}

	get path() {
		return '/'+this._path.join('/')
	}

	get currentDirectory() {
		const path = [...this._path]
		let currentDirectory = fileTree

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
