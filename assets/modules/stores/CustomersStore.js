import {ReduceStore} from "flux/utils";
import AppDispatcher from '../../AppDispatcher';
import AppActions from "../actions";

class CustomersStore extends ReduceStore {
    constructor() {
        super(AppDispatcher);
    }

    getInitialState() {
        return [];
    }

    reduce(state, action) {
        switch (action.type) {
            case 'customers_loaded':
                return action.customers;
            default:
                return state;
        }
    }
}

const customersStore = new CustomersStore();
export default customersStore;
