import { ReduceStore } from 'flux/utils'
import Dispatcher from '../../Dispatcher'

class CustomersStore extends ReduceStore {
	constructor() {
		super(Dispatcher)
	}

	getInitialState() {
		return []
	}

	reduce(state, action) {
		switch (action.type) {
			case 'customers_loaded':
				return action.customers
			default:
				return state
		}
	}
}

const customersStore = new CustomersStore()
export default customersStore
