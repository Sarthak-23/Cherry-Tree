import { all, call} from 'redux-saga/effects';

import userSagas from './User/user.sagas';
import productSagas from './Product/products.sagas';
import restaurantSagas from './Restaurants/restaurants.sagas';
import ordersSagas from './Orders/orders.sagas';
import feedbackSagas from './FeedBack/feebacks.sagas';

export default function* rootSaga() {
    yield all([
        call(userSagas),
        call(productSagas),
        call(restaurantSagas),
        call(ordersSagas),
        call(feedbackSagas),
    ])
}