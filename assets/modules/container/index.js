import React from 'react';
import { Container } from 'flux/utils';
import Actions from '../actions';

import InvoiceStore from '../stores/InvoiceStore';
import CustomersStore from '../stores/CustomersStore';
import ProductsStore from '../stores/ProductsStore';
import InvoiceItemsStore from '../stores/InvoiceItemsStore';

import InvoiceList from '../../views/InvoiceList';

class AppContainer extends React.Component {
  constructor () {
    super();
    Actions.loadAll();
  }

  static getStores () {
    return [ InvoiceStore, CustomersStore, ProductsStore, InvoiceItemsStore ];
  }

  static calculateState ( prevState ) {
    return {
      invoices: InvoiceStore.getState(),
      customers: CustomersStore.getState(),
      products: ProductsStore.getState(),
      invoiceItems: InvoiceItemsStore.getState(),
      onCreateInvoice: Actions.createInvoice,
      onDeleteInvoice: Actions.deleteInvoice,
      onSelectInvoice: Actions.loadInvoiceItems,
      onCustomerChange: Actions.changeCustomer,
      onAddItem: Actions.addItem,
      onItemRemove: Actions.itemRemove,
      onItemInc: Actions.itemInc,
      onItemDec: Actions.itemDec,
      onChangeDiscount: Actions.changeInvoiceDiscount
    };
  }

  render () {
    return (
      <InvoiceList
        invoices={this.state.invoices}
        customers={this.state.customers}
        products={this.state.products}
        invoiceItems={this.state.invoiceItems}
        onCreateInvoice={this.state.onCreateInvoice}
        onDeleteInvoice={this.state.onDeleteInvoice}
        onSelectInvoice={this.state.onSelectInvoice}
        onCustomerChange={this.state.onCustomerChange}
        onAddItem={this.state.onAddItem}
        onItemRemove={this.state.onItemRemove}
        onItemInc={this.state.onItemInc}
        onItemDec={this.state.onItemDec}
        onChangeDiscount={this.state.onChangeDiscount}
      />
    );
  }
}

export default Container.create( AppContainer );
