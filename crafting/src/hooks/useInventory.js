import { useState } from 'react'

function useInventory(cols = 5, rows = 3) {
	const [slots, setSlots] = useState(Array(cols * rows).fill(null))
	const [craftSlots, setCraftSlots] = useState(Array(5).fill(null))

	const handleDragStart = (e, index, from) => {
		e.dataTransfer.setData('from', from)
		e.dataTransfer.setData('index', index)

		let item = null

		if (from === 'inventory' && index !== null) {
			item = slots[index]
			setSlots(prev => {
				const copy = [...prev]
				copy[index] = null
				return copy
			})
		}

		if (from === 'craft' && index !== null) {
			item = craftSlots[index]
			setCraftSlots(prev => {
				const copy = [...prev]
				copy[index] = null
				return copy
			})
		}

		if (from === 'result') {
			item = e.dataTransfer.getData('item')
		}

		e.dataTransfer.setData('item', item)
	}

	const handleDrop = (e, index, to) => {
		e.preventDefault()
		const item = e.dataTransfer.getData('item')
		const from = e.dataTransfer.getData('from')
		if (!item) return

		if (to === 'inventory') {
			setSlots(prev => {
				const copy = [...prev]
				copy[index] = item
				return copy
			})
		}

		if (to === 'craft') {
			setCraftSlots(prev => {
				const copy = [...prev]
				copy[index] = item
				return copy
			})
		}

		if (from === 'result') clearCraftGrid()
	}

	const handleDragOver = e => e.preventDefault()

	const addToInventory = item => {
		setSlots(prev => {
			const copy = [...prev]
			const empty = copy.findIndex(s => !s)
			if (empty !== -1) copy[empty] = item
			return copy
		})
		clearCraftGrid()
	}

	const addToCraftGrid = item => {
		setCraftSlots(prev => {
			const copy = [...prev]
			const empty = copy.findIndex(s => !s)
			if (empty !== -1) copy[empty] = item
			return copy
		})
	}

	const clearCraftGrid = () => setCraftSlots(Array(5).fill(null))

	const removeItemFromInventory = index => {
		setSlots(prev => {
			const copy = [...prev]
			copy[index] = null
			return copy
		})
	}

	const removeItemFromCraft = index => {
		setCraftSlots(prev => {
			const copy = [...prev]
			copy[index] = null
			return copy
		})
	}

	const clearInventory = () => {
		setSlots(Array(cols * rows).fill(null))
	}


	return {
		slots,
		cols,
		craftSlots,
		handleDrop,
		handleDragOver,
		handleDragStart,
		addToInventory,
		addToCraftGrid,
		clearCraftGrid,
		removeItemFromInventory,
		removeItemFromCraft,
		clearInventory,
	}
}

export default useInventory
