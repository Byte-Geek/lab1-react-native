import { useState } from 'react'

export default function useCraftGrid(slots = 5) {
	const [craftSlots, setCraftSlots] = useState(Array(slots).fill(null))
	const [result, setResult] = useState(null)

	const handleDrop = (e, index) => {
		e.preventDefault()
		const color = e.dataTransfer.getData('resource')
		const fromIndex = e.dataTransfer.getData('fromCraftIndex')
		const newSlots = [...craftSlots]

		if (!color) return

		if (fromIndex !== '') {
			const fromIdx = Number(fromIndex)
			newSlots[index] = newSlots[fromIdx]
			newSlots[fromIdx] = color
		} else {
			newSlots[index] = color
		}

		setCraftSlots(newSlots)
		calculateResult(newSlots)
	}

	const handleDragOver = e => e.preventDefault()

	const handleDragStart = (e, index) => {
		const item = craftSlots[index]
		if (item) {
			e.dataTransfer.setData('resource', item)
			e.dataTransfer.setData('fromCraftIndex', index)
			const newSlots = [...craftSlots]
			newSlots[index] = null
			setCraftSlots(newSlots)
		}
	}

	const removeItem = index => {
		const newSlots = [...craftSlots]
		newSlots[index] = null
		setCraftSlots(newSlots)
		calculateResult(newSlots)
	}

	const clearCraftGrid = () => {
		setCraftSlots(Array(slots).fill(null))
		setResult(null)
	}

	const calculateResult = slotsArray => {
		if (slotsArray.every(s => s === 'red') && slotsArray.some(s => s)) {
			setResult('purple')
		} else {
			setResult(null)
		}
	}

	return {
		craftSlots,
		result,
		handleDrop,
		handleDragOver,
		handleDragStart,
		removeItem,
		clearCraftGrid,
	}
}
