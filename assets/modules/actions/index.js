import Dispatcher from '../../Dispatcher'
import api from '../api'

function calculateTotal(invoice_id) {
	Promise.all([api.getInvoiceItems(invoice_id), api.getProducts()])
		.then(array => {
			let items = array[0]
			let products = array[1]
			let sum = 0
			items.forEach(item => {
				let price = products.filter(product => item.product_id === product.id)[0].price
				let itemPrice = price * item.quantity
				sum = sum + itemPrice
			})
			return Math.round(sum * 100) / 100
		})
		.then(total => api.changeInvoice(invoice_id, { total: total }))
}

const Actions = {
	loadInvoices() {
		window.loadInvoices = this.loadInvoices
		api.getInvoices().then(data => {
			Dispatcher.dispatch({
				type: 'invoices_loaded',
				invoices: data
			})
		})
	},
	loadProducts() {
		api.getProducts().then(data => {
			Dispatcher.dispatch({
				type: 'products_loaded',
				products: data
			})
		})
	},
	loadCustomers() {
		api.getCustomers().then(data => {
			Dispatcher.dispatch({
				type: 'customers_loaded',
				customers: data
			})
		})
	},
	loadAll() {
		return Promise.all([Actions.loadInvoices(), Actions.loadCustomers(), Actions.loadProducts()])
	},
	createInvoice() {
		api
			.createInvoice()
			.then(data => api.getInvoices())
			.then(data =>
				Dispatcher.dispatch({
					type: 'invoice_created',
					invoices: data
				})
			)
	},
	loadInvoiceItems(id) {
    api
      .getInvoiceItems(id).then(data =>
        Dispatcher.dispatch({
          type: 'invoice_items_loaded',
          items: data
        })
    )
  },
	deleteInvoice(id) {
		api
			.deleteInvoice(id)
			.then(data => api.getInvoices())
			.then(data =>
				Dispatcher.dispatch({
					type: 'invoice_deleted',
					invoices: data
				})
			)
	},
	changeCustomer(customer_id, invoice_id) {
		api
			.changeCustomer(customer_id, invoice_id)
			.then(data => api.getInvoices())
			.then(data =>
				Dispatcher.dispatch({
					type: 'customer_changed',
					invoices: data
				})
			)
	},
	addItem(invoice_id, product_id, qty) {
		api
			.createItem(invoice_id)
			.then(item => item.id)
			.then(item_id =>
				api.changeItem(invoice_id, item_id, {
					product_id: product_id,
					quantity: qty
				})
			)
			.then(() => calculateTotal(invoice_id))
			.then(() => api.getInvoiceItems(invoice_id))
			.then(data =>
				Dispatcher.dispatch({
					type: 'item_added',
					items: data
				})
			)
			.then(() => api.getInvoices())
			.then(data =>
				Dispatcher.dispatch({
					type: 'invoice_changed',
					invoices: data
				})
			)
	},
	itemInc(invoice_id, item_id, currentQuantity) {
		api
			.changeItemQuantity(invoice_id, item_id, currentQuantity + 1)
			.then(() => calculateTotal(invoice_id))
			.then(() => api.getInvoiceItems(invoice_id))
			.then(data =>
				Dispatcher.dispatch({
					type: 'item_changed',
					items: data
				})
			)
			.then(() => api.getInvoices())
			.then(data =>
				Dispatcher.dispatch({
					type: 'invoice_changed',
					invoices: data
				})
			)
	},
	itemDec(invoice_id, item_id, currentQuantity) {
		if (currentQuantity === 1) {
			api
				.deleteItem(invoice_id, item_id)
				.then(() => calculateTotal(invoice_id))
				.then(() => api.getInvoiceItems(invoice_id))
				.then(data =>
					Dispatcher.dispatch({
						type: 'item_changed',
						items: data
					})
				)
				.then(() => api.getInvoices())
				.then(data =>
					Dispatcher.dispatch({
						type: 'invoice_changed',
						invoices: data
					})
				)
		} else {
			api
				.changeItemQuantity(invoice_id, item_id, currentQuantity - 1)
				.then(() => calculateTotal(invoice_id))
				.then(() => api.getInvoiceItems(invoice_id))
				.then(data =>
					Dispatcher.dispatch({
						type: 'item_changed',
						items: data
					})
				)
				.then(() => api.getInvoices())
				.then(data =>
					Dispatcher.dispatch({
						type: 'invoice_changed',
						invoices: data
					})
				)
		}
	},
	itemRemove(invoice_id, item_id) {
		api
			.deleteItem(invoice_id, item_id)
			.then(() => calculateTotal(invoice_id))
			.then(() => api.getInvoiceItems(invoice_id))
			.then(data =>
				Dispatcher.dispatch({
					type: 'item_changed',
					items: data
				})
			)
			.then(() => api.getInvoices())
			.then(data =>
				Dispatcher.dispatch({
					type: 'invoice_changed',
					invoices: data
				})
			)
	},

	changeInvoiceDiscount(invoice_id, discount) {
		api
			.changeInvoice(invoice_id, { discount: discount })
			.then(() => calculateTotal(invoice_id))
			.then(() => api.getInvoices())
			.then(data =>
				Dispatcher.dispatch({
					type: 'invoice_changed',
					invoices: data
				})
			)
	}
}

export default Actions
