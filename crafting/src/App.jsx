import Inventory from './components/Inventory'
import Resources from './components/Resources'
import Garbage from './components/Garbage'
import CraftGrid from './components/CraftGrid'
import { InventoryProvider } from './context/InventoryContext'


function App() {
	return (
		<InventoryProvider>
		<div className='flex flex-col h-screen p-8 gap-4'>
			<div className='relative flex h-24 items-center'>
				<div className='absolute left-0'>
					<p>Posible Crafts</p>
				</div>
				<div className='absolute right-0'>
					<p>Discovered</p>
				</div>
			</div>

			<div className='mx-auto '>
				<CraftGrid />
			</div>

			<div className='flex items-end justify-between mt-auto w-full'>
				<div className='flex-1 flex items-end justify-center max-w-[300px]'>
					<Resources />
				</div>
				<div className='flex-1 flex items-end justify-center mx-6'>
					<Inventory />
				</div>

				<div className='flex-1 flex items-end justify-center max-w-[300px] h-full'>
					<Garbage />
				</div>
			</div>
		</div>
		</InventoryProvider>
	)
}

export default App
