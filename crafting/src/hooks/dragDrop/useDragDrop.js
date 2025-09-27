export default function useDragDrop() {
	const handleDragStart = (e, item, index = null, from = null) => {
		e.dataTransfer.setData('item', item)
		e.dataTransfer.setData('from', from)
		e.dataTransfer.setData('index', index)
	}

	const handleDrop = (e, toCallback) => {
		e.preventDefault()
		const item = e.dataTransfer.getData('item')
		if (!item) return
		if (toCallback) toCallback(item)
	}

	const handleDragOver = e => e.preventDefault()

	return { handleDragStart, handleDrop, handleDragOver }
}
