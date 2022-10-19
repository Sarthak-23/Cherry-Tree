import { takeLatest, put, all, call} from 'redux-saga/effects';
import RestaurantsTypes from './restaurants.types';
import { handleFetchRestaurants } from './restaurants.helpers';
import { setRestaurants } from './restaurants.actions';

export function* fetchRestaurants() {
    try{
        const restaurants = yield handleFetchRestaurants();
        yield put(
            setRestaurants(restaurants)
        );
    } catch(err) {
        console.log(err);
    }
}

export function* onFetchRestaurantsStart() {
    yield takeLatest(RestaurantsTypes.FETCH_RESTAURANTS_START, fetchRestaurants );
}


export default function* RestaurantsSagas() {
    yield all([
        call(onFetchRestaurantsStart)
    ])
}