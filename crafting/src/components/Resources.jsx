import React from 'react'
import { useCraftContext } from '../hooks/useCraftContext'
import useGameData from '../hooks/useGameData'

function Resources() {
	const { addItem, handleDragStart, handleDragOver } = useCraftContext()
	const { resources } = useGameData()

	return (
		<div className='p-4 border rounded-lg border-green-400 bg-green-100 flex flex-col items-center justify-center'>
			<h3 className='mb-2 font-bold text-green-600'>Resources</h3>
			<div className='flex flex-col gap-2'>
				{resources.map((color, index) => (
					<div
						key={index}
						draggable
						onDragStart={e => handleDragStart(e, color, null, 'resource')}
						onDragOver={handleDragOver}
						onClick={() => addItem(color)}
						className='w-16 h-16 rounded-lg cursor-pointer'
						style={{ backgroundColor: color }}
					/>
				))}
			</div>
		</div>
	)
}

export default Resources
