import { useState, useEffect } from 'react'

export default function useCrafting(craftSlots) {
	const [recipes, setRecipes] = useState([])
	const [result, setResult] = useState(null)

	
	useEffect(() => {
		fetch('/data.json')
			.then(res => res.json())
			.then(data => setRecipes(data.recipes))
	}, [])

	useEffect(() => {
		if (!craftSlots || recipes.length === 0) {
			setResult(null)
			return
		}

		const nonEmpty = craftSlots.filter(Boolean)
		if (nonEmpty.length === 0) {
			setResult(null)
			return
		}


		const recipe = recipes.find(r => {
			if (r.inputs.length !== nonEmpty.length) return false
			return r.inputs.every(color => nonEmpty.includes(color))
		})

		setResult(recipe ? recipe.result : null)
	}, [craftSlots, recipes])

	return { result }
}
