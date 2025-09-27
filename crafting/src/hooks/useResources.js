import { useState } from 'react'
import data from '../../public/data.json'

export default function useResources() {
	const [resources] = useState(data.resources)

	const handleDragStart = (event, color) => {
		event.dataTransfer.setData('item', color)
		event.dataTransfer.setData('from', 'resources')
	}

	return { resources, handleDragStart }
}
