import {ReduceStore} from "flux/utils";
import AppDispatcher from '../../AppDispatcher';
import AppActions from '../actions';

class InvoiceItemsStore extends ReduceStore {
    constructor() {
        super(AppDispatcher);
        window.a = this;
    }

    getInitialState() {
        return [];
    }

    reduce(state, action) {
        switch (action.type) {
            case 'invoice_items_loaded':
                return action.items;
            case 'item_added':{
                return action.items;
            }
            case 'item_changed':{
                return action.items;
            }
            default:
                return state;
        }
    }
}

const invoiceItemsStore = new InvoiceItemsStore();
export default invoiceItemsStore;
