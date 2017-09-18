import React, {Component} from 'react';

export default class ModalAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      thisInvoice: false

    }
  }

  calcPrice(a, b) {
    return parseFloat(a * b).toFixed(2);
  };

  calcTotal() {

  }


  render() {

    console.log(this)

    let currentInvoice = this.props.statements.currentInvoice || [];
		let currentCustomer = currentInvoice.customer_id || [];
		let currentDiscount = currentInvoice.discount || [];
    let currentTotal = currentInvoice.total || [];

    let invoiceItems = this.props.invoiceItems;
    let products = this.props.products;

    return <div id="addInvoice" className="modal fade" role="dialog">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<button type="button" className="close" data-dismiss="modal">
							&times;
						</button>
						<h4 className="modal-title">Create New Incoice</h4>
					</div>
					<div className="modal-body">
						<label>Contact</label>
						<select className="form-control" onChange={e => {}}>
							{this.props.properties.customers.map(el => (
								<option
									key={el.id}
									value={el.id}
									selected={el.id === currentCustomer ? 'selected' : null}
								>
									{el.name}
								</option>
							))}}
						</select>

						<div className="form-group">
							<label className="control-label">Items:</label>
							<div className="well">
								<table className="product-table">
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
											return <tr key={el.id}>
													<td>
														{products.filter(
															product => product.id === el.product_id
														)[0] === undefined ? null : (
															products.filter(
																product => product.id === el.product_id
															)[0].name +
															' - $' +
															products.filter(
																product => product.id === el.product_id
															)[0].price
														)}
													</td>
													<td>
														<button className="btn btn-info btn-xs" onClick={() => this.props.properties.onItemInc(currentInvoice.id, el.id, el.quantity)}>
															<i className="glyphicon glyphicon-plus" />
														</button>
														<input className="form-control" type="number" value={el.quantity} disabled />
														<button className="btn btn-warning btn-xs" onClick={() => this.props.properties.onItemDec(currentInvoice.id, el.id, el.quantity)}>
															<i className="glyphicon glyphicon-minus" />
														</button>
													</td>
													<td>
														{products.filter(
															product => product.id === el.product_id
														)[0] === undefined ? null : (
															this.calcPrice(
																products.filter(
																	product => product.id === el.product_id
																)[0].price,
																el.quantity
															)
														)}
													</td>
													<td>
														<button type="button" className="btn-xs btn-danger btn-delete-item btn btn-default">
															<i className="glyphicon glyphicon-trash" />
														</button>
													</td>
												</tr>;
										})}

										<tr>
											<td>
												<select className="form-control" id="products">
													{this.props.properties.products.map(el => (
														<option key={el.id} value={el.id}>
															{el.name} - ${el.price}
														</option>
													))}}
												</select>
											</td>
											<td>
												<input type="number" value="1" placeholder="Quantity" className="form-control" />
											</td>
											<td />
											<td>
												<button id="add-item-btn" type="button" className="btn-xs btn-success btn btn-default">
													<i className="glyphicon glyphicon-plus" />Add
												</button>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>

						<div className="form-group">
							<label>Sub Total</label>
							<input type="text" className="form-control" id="subtotal" disabled value="0" />
						</div>

						<div className="form-group">
							<label value={currentInvoice.discount}>Discount %</label>
							<input type="number" min="0" max="100" className="form-control" id="discount" placeholder={currentInvoice.discount} onChange={e => {
									if (e.target.value < 0) {
										e.target.value = 0;
									}
									if (e.target.value > 100) {
										e.target.value = 100;
									}
									this.props.properties.onChangeDiscount(currentInvoice.id, e.target.value);
								}} />
						</div>

						<div className="form-group">
							<label>Total</label>
							<input type="text" className="form-control" id="total" disabled value="888" />
						</div>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-default" data-dismiss="modal">
							Close
						</button>
					</div>
				</div>
			</div>
		</div>;
	}
}
