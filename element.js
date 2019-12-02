export function elementBuilder(tag) {
	const ele = document.createElement(tag)

	const builder = {
		contents: contents => {
			if (typeof contents === 'string') {
				contents = document.createTextNode(contents)
			}

			if (contents instanceof Node) {
				ele.appendChild(contents)
			}

			return builder
		},
		class: (...classNames) => {
			classNames.forEach(className => {
				ele.classList.add(className)
			})
			return builder
		},
		make: () => {
			return ele
		}
	}

	return builder
}
