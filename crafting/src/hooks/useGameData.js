import { useState, useEffect } from 'react'

export default function useGameData() {
	const [resources, setResources] = useState([])
	const [recipes, setRecipes] = useState([])

	useEffect(() => {
		fetch('/data.json')
			.then(res => res.json())
			.then(data => {
				setResources(data.resources)
				setRecipes(data.recipes)
			})
	}, [])

	return { resources, recipes }
}
