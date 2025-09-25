import React from 'react'
import { useInventoryContext } from '../hooks/useInventoryContext'
import useCrafting from '../hooks/useCrafting'

function CraftGrid() {
	const {
		craftSlots,
		handleDrop,
		handleDragOver,
		handleDragStart,
		addToInventory,
		clearCraftGrid,
	} = useInventoryContext()

	const { result } = useCrafting(craftSlots)

	return (
		<div className='flex flex-col items-center gap-4'>
			<div className='w-20 h-20 border-2 border-yellow-500 rounded-md flex items-center justify-center bg-yellow-100'>
				{result && (
					<div
						className='w-4/5 h-4/5 rounded-full cursor-pointer'
						style={{ backgroundColor: result }}
						onClick={() => addToInventory(result)}
						draggable
						onDragStart={e => handleDragStart(e, null, 'result')}
					/>
				)}
			</div>

			<div className='grid grid-cols-5 gap-2'>
				{craftSlots.map((item, index) => (
					<div
						key={index}
						className='w-16 h-16 border-2 border-dashed border-gray-400 rounded-md flex items-center justify-center cursor-pointer'
						onDrop={e => handleDrop(e, index, 'craft')}
						onDragOver={handleDragOver}
						draggable={!!item}
						onDragStart={e => handleDragStart(e, index, 'craft')}
						onClick={() => item && addToInventory(item)}
					>
						{item && (
							<div
								className='w-4/5 h-4/5 rounded-full'
								style={{ backgroundColor: item }}
							/>
						)}
					</div>
				))}
			</div>

			<button
				className='px-3 py-1 bg-red-500 text-white rounded'
				onClick={() => clearCraftGrid()}
			>
				Clear Craft Grid
			</button>
		</div>
	)
}

export default CraftGrid
