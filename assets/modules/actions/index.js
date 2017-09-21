import Dispatcher from '../../Dispatcher';
import api from '../api';

function calculateTotal ( invoiceId ) {
  Promise.all( [ api.getInvoiceItems( invoiceId ), api.getProducts() ] )
    .then( ( array ) => {
      const items = array[0];
      const products = array[1];
      let sum = 0;

      items.forEach( ( item ) => {
        const price = products.filter( ( product ) => item.product_id === product.id )[0].price;
        const itemPrice = price * item.quantity;

        sum = sum + itemPrice;
      } );

      return Math.round( sum * 100 ) / 100;
    } )
    .then( ( total ) => api.changeInvoice( invoiceId, { total } ) );
}

const Actions = {
  loadInvoices () {
    window.loadInvoices = this.loadInvoices;
    api.getInvoices().then( ( data ) => {
      Dispatcher.dispatch( {
        type: 'invoices_loaded',
        invoices: data
      } );
    } );
  },
  loadProducts () {
    api.getProducts().then( ( data ) => {
      Dispatcher.dispatch( {
        type: 'products_loaded',
        products: data
      } );
    } );
  },
  loadCustomers () {
    api.getCustomers().then( ( data ) => {
      Dispatcher.dispatch( {
        type: 'customers_loaded',
        customers: data
      } );
    } );
  },
  loadAll () {
    return Promise.all( [ Actions.loadInvoices(), Actions.loadCustomers(), Actions.loadProducts() ] );
  },
  createInvoice () {
    api
      .createInvoice()
      .then( ( data ) => api.getInvoices() )
      .then( ( data ) =>
        Dispatcher.dispatch( {
          type: 'invoice_created',
          invoices: data
        } )
      );
  },
  loadInvoiceItems ( id ) {
    api
      .getInvoiceItems( id )
      .then( ( data ) =>
        Dispatcher.dispatch( {
          type: 'invoice_items_loaded',
          items: data
        } )
      );
  },
  deleteInvoice ( id ) {
    api
      .deleteInvoice( id )
      .then( ( data ) => api.getInvoices() )
      .then( ( data ) =>
        Dispatcher.dispatch( {
          type: 'invoice_deleted',
          invoices: data
        } )
      );
  },
  changeCustomer ( customer_id, invoiceId ) {
    api
      .changeCustomer( customer_id, invoiceId )
      .then( ( data ) => api.getInvoices() )
      .then( ( data ) =>
        Dispatcher.dispatch( {
          type: 'customer_changed',
          invoices: data
        } )
      );
  },
  addItem ( invoiceId, product_id, qty ) {
    api
      .createItem( invoiceId )
      .then( ( item ) => item.id )
      .then( ( itemId ) =>
        api.changeItem( invoiceId, itemId, {
          product_id,
          quantity: qty
        } )
      )
      .then( () => calculateTotal( invoiceId ) )
      .then( () => api.getInvoiceItems( invoiceId ) )
      .then( ( data ) =>
        Dispatcher.dispatch( {
          type: 'item_added',
          items: data
        } )
      )
      .then( () => api.getInvoices() )
      .then( ( data ) =>
        Dispatcher.dispatch( {
          type: 'invoice_changed',
          invoices: data
        } )
      );
  },
  itemInc ( invoiceId, itemId, currentQuantity ) {
    api
      .changeItemQuantity( invoiceId, itemId, currentQuantity + 1 )
      .then( () => calculateTotal( invoiceId ) )
      .then( () => api.getInvoiceItems( invoiceId ) )
      .then( ( data ) =>
        Dispatcher.dispatch( {
          type: 'item_changed',
          items: data
        } )
      )
      .then( () => api.getInvoices() )
      .then( ( data ) =>
        Dispatcher.dispatch( {
          type: 'invoice_changed',
          invoices: data
        } )
      );
  },
  itemDec ( invoiceId, itemId, currentQuantity ) {
    if ( currentQuantity === 1 ) {
      api
        .deleteItem( invoiceId, itemId )
        .then( () => calculateTotal( invoiceId ) )
        .then( () => api.getInvoiceItems( invoiceId ) )
        .then( ( data ) =>
          Dispatcher.dispatch( {
            type: 'item_changed',
            items: data
          } )
        )
        .then( () => api.getInvoices() )
        .then( ( data ) =>
          Dispatcher.dispatch( {
            type: 'invoice_changed',
            invoices: data
          } )
        );
    } else {
      api
        .changeItemQuantity( invoiceId, itemId, currentQuantity - 1 )
        .then( () => calculateTotal( invoiceId ) )
        .then( () => api.getInvoiceItems( invoiceId ) )
        .then( ( data ) =>
          Dispatcher.dispatch( {
            type: 'item_changed',
            items: data
          } )
        )
        .then( () => api.getInvoices() )
        .then( ( data ) =>
          Dispatcher.dispatch( {
            type: 'invoice_changed',
            invoices: data
          } )
        );
    }
  },
  itemRemove ( invoiceId, itemId ) {
    api
      .deleteItem( invoiceId, itemId )
      .then( () => calculateTotal( invoiceId ) )
      .then( () => api.getInvoiceItems( invoiceId ) )
      .then( ( data ) =>
        Dispatcher.dispatch( {
          type: 'item_changed',
          items: data
        } )
      )
      .then( () => api.getInvoices() )
      .then( ( data ) =>
        Dispatcher.dispatch( {
          type: 'invoice_changed',
          invoices: data
        } )
      );
  },

  changeInvoiceDiscount ( invoiceId, discount ) {
    api
      .changeInvoice( invoiceId, { discount } )
      .then( () => calculateTotal( invoiceId ) )
      .then( () => api.getInvoices() )
      .then( ( data ) =>
        Dispatcher.dispatch( {
          type: 'invoice_changed',
          invoices: data
        } )
      );
  }
};

export default Actions;
