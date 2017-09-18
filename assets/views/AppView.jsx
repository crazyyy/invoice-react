import React, {Component} from "react";
import ModalAdd from './ModalAdd';

export default class App extends Component {

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
              return <tr key={el.id} className={this.state.currentInvoice.id === el.id ? 'active' : ''}>
                  <td>{el.id}</td>
                  <td>
                    {customers.filter(customer => customer.id === el.customer_id)[0] ===
                    undefined ? null : (
                      customers.filter(customer => customer.id === el.customer_id)[0].name
                    )}
                  </td>
                  <td>{el.discount === '' ? '0 %' : el.discount + ' %'}</td>
                  <td>
                    {Math.round((el.total - el.total * (el.discount / 100)) * 100) / 100}
                  </td>
                  <td>

                  <button
                    className="btn btn-success"
                    data-toggle="modal"
                    data-target='#addInvoice'
                    onClick={() => {
                        this.setState({ currentInvoice: el, visibility: 'visible' });
                        this.props.onSelectInvoice(el.id);
                      }}>
                    <i className="glyphicon glyphicon-pencil" />
                  </button>

                    <button className="btn btn-danger" onClick={e => {
                        this.props.onDeleteInvoice(el.id);
                        this.setState({ visibility: 'hidden' });
                        e.stopPropagation();
                      }}>
                      <i className="glyphicon glyphicon-trash" />
                    </button>

                  </td>
                </tr>
            })}
          </tbody>
        </table>

        <button type="button" className="btn btn-primary" onClick={() => this.props.onCreateInvoice()}>
          <i className="glyphicon glyphicon-plus" />
        </button>

      </div>



      <ModalAdd properties={this.props} statements={this.state} invoiceItems={invoiceItems} products={products} />


      </div>
    )
  }
}
