import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './User/user.reducer';
import productsReducer from './Product/products.reducer';
import restaurantsReducer from './Restaurants/restaurants.reducer'
import cartReducer from './Cart/cart.reducer';
import ordersReducer from './Orders/orders.reducer';
import feedbackReducer from './FeedBack/feebacks.reducer';

export const rootReducer = combineReducers({
    user:userReducer,
    productsData: productsReducer,
    restaurantsData: restaurantsReducer,
    cartData: cartReducer,
    ordersData: ordersReducer,
    feedbacksData: feedbackReducer,
});

const configStorage = {
    key: 'root',
    storage,
    whitelist: ['cartData']
};

export default persistReducer(configStorage, rootReducer);