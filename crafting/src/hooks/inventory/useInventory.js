import useInventorySlots from './useInventorySlots'
import useCraftGrid from '../crafting/useCraftGrid'
import useCraftingSystem from '../crafting/useCraftingResult'
import useDragDrop from '../dragDrop/useDragDrop'

export default function useInventory(cols = 6, rows = 3) {
	const { slots, setSlots, addItem, removeItem, clearInventory } =
		useInventorySlots(cols, rows)
	const {
		craftSlots,
		addToCraftGrid,
		removeFromCraftGrid,
		clearCraftGrid,
		setCraftSlots,
	} = useCraftGrid(5)
	const { result, takeResult, setResult } = useCraftingSystem(
		craftSlots,
		clearCraftGrid
	)
	const { handleDragStart, handleDragOver } = useDragDrop()

	const handleDrop = (e, to, toIndex = null) => {
		e.preventDefault()
		const item = e.dataTransfer.getData('item')
		const from = e.dataTransfer.getData('from')
		const fromIndex = Number(e.dataTransfer.getData('index'))

		if (!item) return

		if (to === 'inventory') {
			if (from === 'inventory') {
				if (fromIndex !== toIndex) {
					const copy = [...slots]
					copy[toIndex] = item
					copy[fromIndex] = null
					setSlots(copy)
				}
				return
			}
			addItem(item, toIndex)
			if (from === 'craft') removeFromCraftGrid(fromIndex)
			if (from === 'result') setResult(null)
		}

		if (to === 'craft') {
			if (from === 'craft') {
				if (fromIndex !== toIndex) {
					const copy = [...craftSlots]
					copy[toIndex] = item
					copy[fromIndex] = null
					setCraftSlots(copy)
				}
				return
			}
			addToCraftGrid(
				item,
				fromIndex,
				from === 'inventory' ? removeItem : null,
				toIndex
			)
			if (from === 'result') setResult(null)
		}

		if (to === 'garbage') {
			if (from === 'inventory') removeItem(fromIndex)
			if (from === 'craft') removeFromCraftGrid(fromIndex)
			if (from === 'result') setResult(null)
		}
	}

	const takeCraftResult = () => takeResult()

	const resetGame = () => {
		clearInventory()
		clearCraftGrid()
		setResult(null)
	}

	return {
		slots,
		cols,
		craftSlots,
		result,
		setResult,
		handleDrop,
		handleDragOver,
		handleDragStart,
		addItem,
		addToCraftGrid,
		removeFromCraftGrid,
		clearCraftGrid,
		takeCraftResult,
		removeItem,
		clearInventory,
		resetGame,
	}
}
