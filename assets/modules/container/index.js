import { Container } from 'flux/utils';
import AppActions from '../actions';
import InvoiceStore from '../stores/InvoiceStore';
import CustomersStore from '../stores/CustomersStore';
import ProductsStore from '../stores/ProductsStore';
import InvoiceItemsStore from '../stores/InvoiceItemsStore';
import AppView from '../../views/AppView';
import React from 'react';

class AppContainer extends React.Component {
	constructor() {
		super();
    AppActions.loadAll();

	}
  static getStores() {
		return [InvoiceStore, CustomersStore, ProductsStore, InvoiceItemsStore];
	}

  static calculateState(prevState) {
		return {
			invoices: InvoiceStore.getState(),
			customers: CustomersStore.getState(),
			products: ProductsStore.getState(),
			invoiceItems: InvoiceItemsStore.getState(),
			onCreateInvoice: AppActions.createInvoice,
			onDeleteInvoice: AppActions.deleteInvoice,
			onSelectInvoice: AppActions.loadInvoiceItems,
			onCustomerChange: AppActions.changeCustomer,
			onAddItem: AppActions.addItem,
			onItemInc: AppActions.itemInc,
			onItemDec: AppActions.itemDec,
			onChangeDiscount: AppActions.changeInvoiceDiscount
		};
	}

	render() {
		return (
			<AppView
				invoices={this.state.invoices}
				customers={this.state.customers}
				products={this.state.products}
				invoiceItems={this.state.invoiceItems}
				onCreateInvoice={this.state.onCreateInvoice}
				onDeleteInvoice={this.state.onDeleteInvoice}
				onSelectInvoice={this.state.onSelectInvoice}
				onCustomerChange={this.state.onCustomerChange}
				onAddItem={this.state.onAddItem}
				onItemInc={this.state.onItemInc}
				onItemDec={this.state.onItemDec}
				onChangeDiscount={this.state.onChangeDiscount}
			/>
		);
	}
}

export default Container.create(AppContainer);
