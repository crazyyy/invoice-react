import React, { Component } from 'react'
import ModalEdit from './ModalEdit.jsx'
import ModalAdd from './ModalAdd.jsx'

export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			currentInvoice: {},
			currentItem: {},
			mainDiscount: 0
		}
	}

	render() {
		let invoices = this.props.invoices || []
		let customers = this.props.customers || []
		let products = this.props.products || []
		let invoiceItems = this.props.invoiceItems || []

		console.log(this.props)
		console.log(this.state)

		return (
			<div className="maincontainer">
				<div className="col-sm-12">
					<h1>List of Invoices</h1>
					<table className="table table--main">
						<thead>
							<tr>
								<th>#</th>
								<th>Customer</th>
								<th>Price</th>
								<th>Discount</th>
								<th>Total</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{invoices.map(el => {
								return (
									<tr key={el.id} className={this.state.currentInvoice.id === el.id ? 'active' : ''}>
										<td>{el.id}</td>
										<td>
											{customers.filter(customer => customer.id === el.customer_id)[0] === undefined ? null : (
												customers.filter(customer => customer.id === el.customer_id)[0].name
											)}
										</td>
										<td>{el.total}</td>
										<td>{el.discount === '' ? '0 %' : el.discount + ' %'}</td>
										<td>{Math.round((el.total - el.total * (el.discount / 100)) * 100) / 100}</td>
										<td>
											<button
												className="btn btn-success"
												data-toggle="modal"
												data-target="#editInvoice"
												onClick={() => {
													this.setState({ currentInvoice: el })
													this.setState({ mainDiscount: el.discount })
													this.props.onSelectInvoice(el.id)
												}}
											>
												<i className="glyphicon glyphicon-pencil" />
											</button>

											<button
												className="btn btn-danger"
												onClick={e => {
													this.props.onDeleteInvoice(el.id)
													e.stopPropagation()
												}}
											>
												<i className="glyphicon glyphicon-trash" />
											</button>
										</td>
									</tr>
								)
							})}
						</tbody>
					</table>

					<button
						type="button"
						className="btn btn-primary"
						data-toggle="modal"
						data-target="#addInvoice"
						onClick={() => {
							this.props.onCreateInvoice()
							this.props.onSelectInvoice(17)
							this.setState({ currentInvoice: 17 })
							this.setState({ mainDiscount: 0 })
						}}
					>
						<i className="glyphicon glyphicon-plus" />
					</button>
				</div>

				<ModalEdit properties={this.props} statements={this.state} invoiceItems={invoiceItems} products={products} />
				<ModalAdd properties={this.props} statements={this.state} invoiceItems={invoiceItems} products={products} />
			</div>
		)
	}
}
