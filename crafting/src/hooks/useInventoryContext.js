import { useContext } from 'react'
import InventoryContext from '../context/InventoryContext'

export const useInventoryContext = () => useContext(InventoryContext)
