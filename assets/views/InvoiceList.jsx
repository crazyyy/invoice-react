import React, { Component } from 'react';
import ModalEdit from './ModalEdit.jsx';
import ModalAdd from './ModalAdd.jsx';

export default class App extends Component {
  constructor ( props ) {
    super( props );
    this.state = {
      currentInvoice: {},
      currentItem: {},
      currentDiscount: 0
    };
    this.setCurrentDiscount = this.setCurrentDiscount.bind( this );
  }

  setCurrentDiscount ( elementDiscount ) {
    console.log( 'water', elementDiscount );
    this.setState( { currentDiscount: elementDiscount } );
  }

  render () {
    const invoices = this.props.invoices || [];
    const customers = this.props.customers || [];
    const products = this.props.products || [];
    const invoiceItems = this.props.invoiceItems || [];

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
              {invoices.map( ( el ) =>
                <tr key={el.id} className={this.state.currentInvoice.id === el.id ? 'active' : ''}>
                  <td>{el.id}</td>
                  <td>
                    {customers.filter( ( customer ) => customer.id === el.customer_id )[0] === undefined ? null :
                      customers.filter( ( customer ) => customer.id === el.customer_id )[0].name
                    }
                  </td>
                  <td>{el.total}</td>
                  <td>
                    {el.discount === '' ? '0 %' : `${el.discount} %`}
                  </td>
                  <td>{Math.round( ( el.total - el.total * ( el.discount / 100 ) ) * 100 ) / 100}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      data-toggle="modal"
                      data-target="#editInvoice"
                      data-discount={el.discount}
                      onClick={() => {
                        this.setState( { currentInvoice: el } );
                        this.setCurrentDiscount( el.discount );
                        this.props.onSelectInvoice( el.id );
                      }}
                    >
                      <i className="glyphicon glyphicon-pencil" />
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={( e ) => {
                        this.props.onDeleteInvoice( el.id );
                        e.stopPropagation();
                      }}
                    >
                      <i className="glyphicon glyphicon-trash" />
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#addInvoice"
            onClick={() => {
              this.props.onCreateInvoice();
            }}
          >
            <i className="glyphicon glyphicon-plus" />
          </button>
        </div>

        <ModalEdit properties={this.props} statements={this.state} invoiceItems={invoiceItems} products={products} garmonika={this.setCurrentDiscount} />
        <ModalAdd properties={this.props} statements={this.state} invoiceItems={invoiceItems} products={products} />
      </div>
    );
  }
}
