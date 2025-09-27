import { createContext } from 'react'
import useInventory from '../hooks/inventory/useInventory'

const CraftContext = createContext(null)

export function CraftProvider({ children }) {
	const craftState = useInventory()
	return (
		<CraftContext.Provider value={craftState}>{children}</CraftContext.Provider>
	)
}

export default CraftContext
