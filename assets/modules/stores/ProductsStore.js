import { ReduceStore } from 'flux/utils'
import Dispatcher from '../../Dispatcher'

class ProductsStore extends ReduceStore {
	constructor() {
		super(Dispatcher)
	}

	getInitialState() {
		return []
	}

  reduce(state, action) {
    switch (action.type) {
      case 'products_loaded':
        return action.products
      default:
        return state
    }
  }
}

const productsStore = new ProductsStore()

export default productsStore
