import ReactDOM from 'react-dom';
import React from 'react';
import AppContainer from './modules/container';
import AppView from "./views/AppView";

// export default class App extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			currentInvoice: {},
// 			currentItem: {},
//       visibility: 'hidden'
// 		};
// 	}

//   render() {

// 		let invoices = this.props.invoices || [];
// 		let customers = this.props.customers || [];
// 		let products = this.props.products || [];
//     let invoiceItems = this.props.invoiceItems || [];

// 		return <div className="col-xl-12 col-md-12">
// 				<h1>List of Invoices</h1>
// 				<table className="table">
// 					<thead>
// 						<tr>
// 							<th>#</th>
// 							<th>Customer</th>
// 							<th>Discount</th>
// 							<th>Total</th>
// 							<th>Action</th>
// 						</tr>
// 					</thead>
// 					<tbody>
//           {invoices.map(el => {
//             return <tr key={el.id} className={this.state.currentInvoice.id === el.id ? 'active' : ''} onClick={() => {
// 						this.setState({ currentInvoice: el, visibility: 'visible' });
// 						this.props.onSelectInvoice(el.id);
// 					}}>
// 					<td>{el.id}</td>
// 					<td>
// 						{customers.filter(customer => customer.id === el.customer_id)[0] ===
// 						undefined ? null : (
// 							customers.filter(customer => customer.id === el.customer_id)[0].name
// 						)}
// 					</td>
// 					<td>{el.discount === '' ? '0 %' : el.discount + ' %'}</td>
// 					<td>{Math.round((el.total - el.total * (el.discount / 100)) * 100) / 100}</td>
// 					<td>
// 						<button>
// 							<i className="glyphicon glyphicon-pencil" />
// 						</button>
// 						<button>
// 							<i className="glyphicon glyphicon-trash" onClick={e => {
// 									this.props.onDeleteInvoice(el.id);
// 									this.setState({ visibility: 'hidden' });
// 									e.stopPropagation();
// 								}} />
// 						</button>
// 					</td>
// 				</tr>
// 						})}
// 					</tbody>
// 				</table>
// 				<button type="button" className="btn btn-default" onClick={() => this.props.onCreateInvoice()}>
// 					Create Invoice
// 				</button>
// 			</div>;
// 	}
// }


ReactDOM.render(<AppContainer />, document.getElementById('container'));
