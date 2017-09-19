import React, { Component } from 'react'

export default class ModalEdit extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedProduct: 0,
			selectedQuantity: 1,
			selectedDiscount: this.setDiscount()
		}
		this.changeDiscount = this.changeDiscount.bind(this)
	}

	setDiscount() {
		let disc = this.props.statements.mainDiscount
		return disc
	}

	calcAmount(a, b) {
		return parseFloat(a * b).toFixed(2)
	}

	changeSelected(elementId) {
		this.setState({ selectedProduct: elementId })
	}

	changeQuantity(quantity) {
		this.setState({ selectedQuantity: quantity })
	}

	changeDiscount(event) {
		let discount = event.target.value
		if (discount < 0) {
			discount = 0
		}
		if (discount > 100) {
			discount = 100
		}
		this.setState({ selectedDiscount: discount })
		this.props.properties.onChangeDiscount(this.props.statements.currentInvoice.id, discount)
	}

	render() {
		let currentInvoice = this.props.statements.currentInvoice
		let currentCustomer = currentInvoice.customer_id
		let invoiceItems = this.props.invoiceItems
		let products = this.props.products

		return (
			<div id="editInvoice" className="modal fade" role="dialog">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal">
								&times;
							</button>
							<h4 className="modal-title">Create New Invoice</h4>
						</div>

						<div className="modal-body">
							<div className="form-group">
								<label className="control-label">Contact</label>
								<select
									className="form-control"
									onChange={e => {
										this.props.properties.onCustomerChange(e.target.value, currentInvoice.id)
									}}
								>
									{this.props.properties.customers.map(el => (
										<option key={el.id} value={el.id} selected={el.id === currentCustomer ? 'selected' : null}>
											{el.name}
										</option>
									))}}
								</select>
							</div>
							<div className="form-group">
								<label className="control-label">Items:</label>
								<div className="well">
									<table className="table table--items table-striped table-sm">
										<thead>
											<tr>
												<th>Description</th>
												<th>Quantity</th>
												<th>Amount</th>
												<th>Action</th>
											</tr>
										</thead>
										<tbody>
											{invoiceItems.map(el => {
												return (
													<tr key={el.id}>
														<td>
															{products.filter(product => product.id === el.product_id)[0] === undefined ? null : (
																products.filter(product => product.id === el.product_id)[0].name +
																' - $' +
																products.filter(product => product.id === el.product_id)[0].price
															)}
														</td>
														<td>
															<div className="input-group">
																<input className="form-control" type="number" value={el.quantity} disabled />
																<div className="input-group-btn">
																	<button
																		className="btn btn-info"
																		onClick={() =>
																			this.props.properties.onItemInc(currentInvoice.id, el.id, el.quantity)}
																	>
																		<i className="glyphicon glyphicon-plus" />
																	</button>
																	<button
																		className="btn btn-warning"
																		onClick={() =>
																			this.props.properties.onItemDec(currentInvoice.id, el.id, el.quantity)}
																	>
																		<i className="glyphicon glyphicon-minus" />
																	</button>
																</div>
															</div>
														</td>
														<td>
															{products.filter(product => product.id === el.product_id)[0] === undefined ? null : (
																this.calcAmount(
																	products.filter(product => product.id === el.product_id)[0].price,
																	el.quantity
																)
															)}
														</td>
														<td>
															<button
																type="button"
																className="btn-xs btn-danger btn-delete-item btn btn-default"
																onClick={() => this.props.properties.onItemRemove(currentInvoice.id, el.id)}
															>
																<i className="glyphicon glyphicon-trash" />
															</button>
														</td>
													</tr>
												)
											})}

											<tr>
												<td>
													<select
														className="form-control"
														id="products"
														onChange={e => this.changeSelected(e.target.value)}
													>
														{this.props.properties.products.map(el => (
															<option key={el.id} value={el.id}>
																{el.name} - ${el.price}
															</option>
														))}}
													</select>
												</td>
												<td>
													<input
														type="number"
														placeholder="Quantity"
														className="form-control"
														onChange={e => this.changeQuantity(e.target.value)}
													/>
												</td>
												<td />
												<td>
													<button
														id="add-item-btn"
														type="button"
														className="btn-xs btn-success btn btn-default"
														onClick={e => {
															this.props.properties.onAddItem(
																currentInvoice.id,
																this.state.selectedProduct,
																this.state.selectedQuantity
															)
														}}
													>
														<i className="glyphicon glyphicon-plus" />Add
													</button>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
							<div className="form-group row">
								<div className="col-md-3">
									<label>Sub Total</label>
								</div>
								<div className="col-md-3">
									<label value={currentInvoice.discount}>Discount %</label>
								</div>
								<div className="col-md-6">
									<label>Total</label>
								</div>
							</div>
							<div className="form-group row">
								<div className="col-md-3">
									<input
										type="text"
										className="form-control"
										id="subtotal"
										disabled
										value={'$' + currentInvoice.total}
									/>
								</div>
								<div className="col-md-3">
									<input
										className="form-control"
										type="number"
										min="0"
										max="100"
										value={this.props.statements.mainDiscount}
										onChange={this.changeDiscount}
									/>
								</div>
								<div className="col-md-6">
									<input
										type="text"
										className="form-control"
										id="total"
										disabled
										value={
											'$' +
											Math.round(
												(currentInvoice.total - currentInvoice.total * (currentInvoice.discount / 100)) * 100
											) /
												100
										}
									/>
								</div>
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-default" data-dismiss="modal">
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
