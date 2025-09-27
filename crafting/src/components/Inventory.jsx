import React from 'react'
import { useCraftContext } from '../hooks/useCraftContext'

function Inventory() {
	const {
		slots,
		cols,
		handleDrop,
		handleDragOver,
		handleDragStart,
		addToCraftGrid,
		removeItem,
	} = useCraftContext()

	return (
		<div className='p-4 border rounded-lg bg-gray-100 flex flex-col items-center'>
			<h3 className='mb-2 font-bold text-center'>Inventory</h3>

			<div
				className='grid gap-2'
				style={{
					gridTemplateColumns: `repeat(${cols}, 4rem)`,
					gridAutoRows: '4rem',
				}}
			>
				{slots.map((item, index) => (
					<div
						key={index}
						className='border-2 border-dashed border-gray-400 rounded-md flex items-center justify-center cursor-pointer'
						onDrop={e => handleDrop(e, 'inventory', index)}
						onDragOver={handleDragOver}
						draggable={!!item}
						onDragStart={e => handleDragStart(e, item, index, 'inventory')}
						onClick={() => {
							if (item) addToCraftGrid(item, index, removeItem, null)
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
		</div>
	)
}

export default Inventory
