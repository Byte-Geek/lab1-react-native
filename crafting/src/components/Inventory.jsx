import React from 'react'
import { useInventoryContext } from '../hooks/useInventoryContext'

function Inventory() {
	const {
		slots,
		cols,
		handleDrop,
		handleDragOver,
		handleDragStart,
		addToCraftGrid,
	} = useInventoryContext()

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
						onDrop={e => handleDrop(e, index, 'inventory')}
						onDragOver={handleDragOver}
						draggable={!!item}
						onDragStart={e => handleDragStart(e, index, 'inventory')}
						onClick={() => item && addToCraftGrid(item, index)}
						className='border-2 border-dashed border-gray-400 rounded-md flex items-center justify-center cursor-pointer'
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
		</div>
	)
}

export default Inventory
