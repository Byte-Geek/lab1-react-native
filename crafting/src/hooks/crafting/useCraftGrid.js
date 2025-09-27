import { useState } from 'react'

export default function useCraftGrid(size = 5) {
	const [craftSlots, setCraftSlots] = useState(Array(size).fill(null))

	const addToCraftGrid = (
		item,
		fromIndex = null,
		removeFromSource = null,
		toIndex = null
	) => {
		setCraftSlots(prev => {
			const copy = [...prev]

			if (toIndex !== null) {
				copy[toIndex] = item
			} else {
				const empty = copy.findIndex(s => !s)
				if (empty !== -1) copy[empty] = item
			}

			if (removeFromSource && fromIndex !== null) removeFromSource(fromIndex)
			return copy
		})
	}

	const removeFromCraftGrid = index => {
		setCraftSlots(prev => {
			const copy = [...prev]
			copy[index] = null
			return copy
		})
	}

	const clearCraftGrid = () => {
		setCraftSlots(Array(craftSlots.length).fill(null))
	}

	return {
		craftSlots,
		addToCraftGrid,
		removeFromCraftGrid,
		clearCraftGrid,
		setCraftSlots,
	}
}
