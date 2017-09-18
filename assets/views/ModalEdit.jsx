import React from 'react';

console.log('this')

export default class ModalEdit extends React.Component {
	render() {
		return (
			<div id="myModal" className="modal fade" role="dialog">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal">
								&times;
							</button>
							<h4 className="modal-title">Invoice Details</h4>
						</div>
						<div className="modal-body">
							<div className="form-group">
								<label>Customer</label>
								<select
									className="form-control"
									onChange={e => {
										this.props.onCustomerChange(e.target.value, this.state.currentInvoice.id);
									}}
								>
									{customers.map(el => (
										<option key={el.id} value={el.id}>
											{el.name}
										</option>
									))}}
								</select>
							</div>
							<div className="form-group">
								<label>Products</label>
								<table className="table">
									<thead>
										<tr>
											<th>Name</th>
											<th>Price</th>
											<th>Quantity</th>
											<th />
											<th />
										</tr>
									</thead>
									<tbody>
										{invoiceItems.map(el => {
											return (
												<tr key={el.id}>
													<td>
														{products.filter(product => product.id === el.product_id)[0] ===
														undefined ? null : (
															products.filter(product => product.id === el.product_id)[0]
																.name
														)}
													</td>
													<td>
														{products.filter(product => product.id === el.product_id)[0] ===
														undefined ? null : (
															products.filter(product => product.id === el.product_id)[0]
																.price
														)}
													</td>
													<td>{el.quantity}</td>
													<td
														className="btn-link"
														onClick={() =>
															this.props.onItemInc(
																this.state.currentInvoice.id,
																el.id,
																el.quantity
															)}
													>
														+
													</td>
													<td
														className="btn-link"
														onClick={() =>
															this.props.onItemDec(
																this.state.currentInvoice.id,
																el.id,
																el.quantity
															)}
													>
														-
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
								<select
									className="form-control"
									id="products"
									onChange={e => {
										this.props.onAddItem(this.state.currentInvoice.id, e.target.value);
									}}
								>
									{products.map(el => (
										<option key={el.id} value={el.id}>
											{el.name}
										</option>
									))}
								</select>
							</div>
							<div className="form-group">
								<label value={this.state.currentInvoice.discount}>Discount</label>
								<input
									type="number"
									min="0"
									max="100"
									className="form-control"
									id="discount"
									onChange={e => {
										if (e.target.value < 0) {
											e.target.value = 0;
										}
										if (e.target.value > 100) {
											e.target.value = 100;
										}
										this.props.onChangeDiscount(this.state.currentInvoice.id, e.target.value);
									}}
								/>
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
		);
	}
}
