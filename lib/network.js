export class NetworkNavigator {
	constructor(network) {
		this.network = network
		this.init()
	}

	get currentHost() {
		return this.remoteHost || this.localhost
	}

	async init() {
		const { FileSystem } = await import('/lib/file-system.js')
		const localhost = await import(this.network['localhost']) || {}
		this.localhost = new FileSystem(localhost.files)
		delete this.activeNode
		delete this.remoteHost
	}

	async list() {
		return Object.keys(this.network).filter(node => node !== this.activeNode && node !== 'localhost')
	}

	async connect(node = this.activeNode) {
		
		const nodes = await this.list()
		
		if ([...nodes, this.activeNode].includes(node)) {
			const remotePath = this.network[node]
			const remote = await import(remotePath)
			this.activeNode = node
			
			
			const { FileSystem } = await import('/lib/file-system.js')
			this.remoteHost = new FileSystem(remote.files)
			return 'Successfully connected to ' + node
		} else {
			return `Remote host ${node} not found`
		}
	}

	async disconnect() {
		const remoteNode = this.activeNode
		
		await this.init()

		return 'Disconnected from ' + remoteNode
	}
}
