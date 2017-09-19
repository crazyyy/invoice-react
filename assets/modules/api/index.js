class request {
	static get(url) {
		return Promise.resolve(fetch(url).then(res => res.json()))
	}

	static post(url, body) {
		return Promise.resolve(
			fetch(url, {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: body === null ? body : JSON.stringify(body)
			})
		).then(res => res.json())
	}

	static delete(url) {
		return Promise.resolve(
			fetch(url, {
				method: 'DELETE'
			})
		)
	}

	static put(url, body) {
		return Promise.resolve(
			fetch(url, {
				method: 'PUT',
				credentials: 'same-origin',
				body: JSON.stringify(body),
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			})
		)
	}
}

export default class api {
	static getInvoices() {
		return request.get('/api/invoices/')
	}

	static getInvoice(id) {
		return request.get(`/api/invoices/${id}`)
	}

	static createInvoice() {
		return request.post('/api/invoices', { discount: 0, total: 0 })
	}

	static changeInvoice(invoice_id, obj) {
		return request.put(`/api/invoices/${invoice_id}`, obj)
	}

	static deleteInvoice(id) {
		return request.delete(`/api/invoices/${id}`)
	}

	static getProducts() {
		return request.get('/api/products')
	}

	static getProduct(id) {
		return request.get(`/api/products/${id}`)
	}

	static getCustomers() {
		return request.get('/api/customers')
	}

	static getCustomer(id) {
		return request.get(`/api/customers/${id}`)
	}

	static changeCustomer(customer_id, invoice_id) {
		return request.put(`/api/invoices/${invoice_id}`, { customer_id: customer_id })
	}
	static getInvoiceItems(invoice_id) {
		return request.get(`/api/invoices/${invoice_id}/items/`)
	}

	static getInvoiceItem(invoice_id, item_id) {
		return request.get(`/api/invoices/${invoice_id}/items/${item_id}`)
	}

	static createItem(id) {
		return request.post(`/api/invoices/${id}/items/`, { quantity: 1 })
	}

	static changeItem(invoice_id, item_id, payload) {
		return request.put(`/api/invoices/${invoice_id}/items/${item_id}`, payload)
	}

	static deleteItem(invoice_id, item_id) {
		return request.delete(`/api/invoices/${invoice_id}/items/${item_id}`)
	}
	static changeItemQuantity(invoice_id, item_id, quantity) {
		return request.put(`/api/invoices/${invoice_id}/items/${item_id}`, { quantity: quantity })
	}
}
