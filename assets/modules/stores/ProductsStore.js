import {ReduceStore} from "flux/utils";
import AppDispatcher from '../../AppDispatcher';
import AppActions from '../actions';

class ProductsStore extends ReduceStore {
    constructor() {
        super(AppDispatcher);
    }

    getInitialState() {
        return [];
    }

    reduce(state, action) {
        switch (action.type) {
            case 'products_loaded':
                return action.products;
            default:
                return state;
        }
    }
}

const productsStore = new ProductsStore();
export default productsStore;
