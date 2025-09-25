import React from 'react'
import { useInventoryContext } from '../hooks/useInventoryContext'

function Garbage() {
	const { removeItem, clearInventory } = useInventoryContext()

	const handleDrop = e => {
		e.preventDefault()
		const slotIndex = e.dataTransfer.getData('slotIndex')
		if (slotIndex !== '') removeItem(Number(slotIndex))
	}

	const handleDragOver = e => e.preventDefault()

	return (
		<div className='flex flex-col h-full w-full'>
			<div
				className='flex-1 w-full border-2 border-dashed rounded-lg border-red-400 flex items-start justify-center'
				onDrop={handleDrop}
				onDragOver={handleDragOver}
			>
				<span className='text-md font-bold text-red-500 p-4'>Garbage zone</span>
			</div>

			<div className='flex flex-row gap-2 p-2 justify-center'>
				<button
					className='px-3 py-1 bg-red-500 text-white rounded'
					onClick={() => clearInventory()}
				>
					Clear Inventory
				</button>
				<button
					className='px-3 py-1 bg-blue-500 text-white rounded'
					onClick={() => clearInventory()}
				>
					Reset Game
				</button>
			</div>
		</div>
	)
}

export default Garbage
