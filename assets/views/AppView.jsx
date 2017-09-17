import React from "react";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentInvoice: {},
            currentItem: {},
            visibility: 'hidden'
        };
    }

    render() {
        let invoices = this.props.invoices || [];
        let customers = this.props.customers || [];
        let products = this.props.products || [];
        let invoiceItems = this.props.invoiceItems || [];
        return (

<div className="maincontainer">

            <div className="col-sm-12">
				<h1>List of Invoices</h1>
				<table className="table">
					<thead>
						<tr>
							<th>#</th>
							<th>Customer</th>
							<th>Discount</th>
							<th>Total</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
          {invoices.map(el => {
            return <tr key={el.id} className={this.state.currentInvoice.id === el.id ? 'active' : ''} onClick={() => {
						this.setState({ currentInvoice: el, visibility: 'visible' });
						this.props.onSelectInvoice(el.id);
					}}>
					<td>{el.id}</td>
					<td>
						{customers.filter(customer => customer.id === el.customer_id)[0] ===
						undefined ? null : (
							customers.filter(customer => customer.id === el.customer_id)[0].name
						)}
					</td>
					<td>{el.discount === '' ? '0 %' : el.discount + ' %'}</td>
					<td>{Math.round((el.total - el.total * (el.discount / 100)) * 100) / 100}</td>
					<td>
						<button>
							<i className="glyphicon glyphicon-pencil" />
						</button>
						<button>
							<i className="glyphicon glyphicon-trash" onClick={e => {
									this.props.onDeleteInvoice(el.id);
									this.setState({ visibility: 'hidden' });
									e.stopPropagation();
								}} />
						</button>
					</td>
				</tr>
						})}
					</tbody>
				</table>
				<button type="button" className="btn btn-default" onClick={() => this.props.onCreateInvoice()}>
					Create Invoice
				</button>
			</div>


                <div style={{visibility: this.state.visibility}} className="col-sm-6">
                    <h2>Invoice Details</h2>
                    <div className="form-group">
                        <label>Customer</label>
                        <select className="form-control" onChange={e => {
                            this.props.onCustomerChange(e.target.value, this.state.currentInvoice.id);
                        }}>
                            {customers.map(el => <option key={el.id} value={el.id}>{el.name}</option>)}}
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
                                <th/>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            {invoiceItems.map(el => {
                                return (
                                    <tr key={el.id}>
                                        <td>{products.filter(product => product.id === el.product_id)[0] === undefined ? null : products.filter(product => product.id === el.product_id)[0].name}</td>
                                        <td>{products.filter(product => product.id === el.product_id)[0] === undefined ? null : products.filter(product => product.id === el.product_id)[0].price}</td>
                                        <td>{el.quantity}</td>
                                        <td className="btn-link"
                                            onClick={() => this.props.onItemInc(this.state.currentInvoice.id, el.id, el.quantity)}>
                                            +
                                        </td>
                                        <td className="btn-link"
                                            onClick={() => this.props.onItemDec(this.state.currentInvoice.id, el.id, el.quantity)}>
                                            -
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                        <select className="form-control" id="products"
                                onChange={e => {
                                    this.props.onAddItem(this.state.currentInvoice.id, e.target.value);
                                }}>
                            {products.map(el => <option key={el.id} value={el.id}>{el.name}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label value={this.state.currentInvoice.discount}>Discount</label>
                        <input type="number" min="0" max="100" className="form-control" id="discount"
                               onChange={e => {
                                   if (e.target.value < 0) {
                                       e.target.value = 0
                                   }
                                   if (e.target.value > 100) {
                                       e.target.value = 100
                                   }
                                   this.props.onChangeDiscount(this.state.currentInvoice.id, e.target.value);


                               }}/>
                    </div>
                </div>
</div>
        );
    }
}
