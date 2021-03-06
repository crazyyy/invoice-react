import { ReduceStore } from 'flux/utils'
import Dispatcher from '../../Dispatcher'

class InvoiceStore extends ReduceStore {
	constructor() {
		super(Dispatcher)
	}

	getInitialState() {
		return []
	}

	reduce(state, action) {
		switch (action.type) {
			case 'invoices_loaded':
				return action.invoices
			case 'invoice_created':
				return action.invoices
			case 'invoice_deleted':
				return action.invoices
			case 'customer_changed':
				return action.invoices
			case 'invoice_changed':
				return action.invoices
			default:
				return state
		}
	}
}

const invoiceStore = new InvoiceStore()

export default invoiceStore
