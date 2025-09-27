import React from 'react'
import { useCraftContext } from '../hooks/useCraftContext'

function CraftGrid() {
	const {
		craftSlots,
		result,
		handleDrop,
		handleDragOver,
		handleDragStart,
		addItem,
		removeFromCraftGrid,
		clearCraftGrid,
		takeCraftResult,
	} = useCraftContext()

	return (
		<div className='flex flex-col items-center gap-4'>
			<div className='w-20 h-20 border-2 border-yellow-500 rounded-md flex items-center justify-center bg-yellow-100'>
				{result && (
					<div
						className='w-4/5 h-4/5 rounded-full cursor-pointer'
						style={{ backgroundColor: result }}
						onClick={() => addItem(takeCraftResult())}
						draggable
						onDragStart={e => handleDragStart(e, result, null, 'result')}
					/>
				)}
			</div>

			<div className='grid grid-cols-5 gap-2'>
				{craftSlots.map((item, index) => (
					<div
						key={index}
						className='w-16 h-16 border-2 border-dashed border-gray-400 rounded-md flex items-center justify-center cursor-pointer'
						onDrop={e => handleDrop(e, 'craft', index)}
						onDragOver={handleDragOver}
						draggable={!!item}
						onDragStart={e => handleDragStart(e, item, index, 'craft')}
						onClick={() => {
							if (item) {
								addItem(item)
								removeFromCraftGrid(index)
							}
						}}
					>
						{item && (
							<div
								className='w-4/5 h-4/5 rounded-full cursor-move'
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
