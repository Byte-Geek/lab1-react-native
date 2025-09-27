import { useState } from 'react'

export default function useInventorySlots(cols = 5, rows = 3) {
	const [slots, setSlots] = useState(Array(cols * rows).fill(null))

	const addItem = (item, toIndex = null) => {
		setSlots(prev => {
			const copy = [...prev]
			if (toIndex !== null) {
				copy[toIndex] = item
			} else {
				const emptyIndex = copy.findIndex(s => !s)
				if (emptyIndex !== -1) copy[emptyIndex] = item
			}
			return copy
		})
	}

	const removeItem = index => {
		setSlots(prev => {
			const copy = [...prev]
			copy[index] = null
			return copy
		})
	}

	const clearInventory = () => setSlots(Array(cols * rows).fill(null))

	return { slots, setSlots, addItem, removeItem, clearInventory, cols }
}
