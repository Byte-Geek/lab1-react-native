import { useState } from 'react'

export default function useGarbage() {
	const [trash, setTrash] = useState([])

	const handleDrop = e => {
		e.preventDefault()
		const item = e.dataTransfer.getData('item')
		if (item) {
			setTrash(prev => [...prev, item])
		}
	}

	const handleDragOver = e => e.preventDefault()

	return { trash, handleDrop, handleDragOver }
}
