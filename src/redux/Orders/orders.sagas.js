import ordersTypes from "./orders.types";
import { takeLatest, put, all, call } from 'redux-saga/effects'
import { handleSaveOrder, handleGetUserOrderHistory, handleGetOrder, handleGetAdminOrderHistory ,handleAdminGetOrder } from "./orders.helpers";
import { auth } from '../../Firebase/utilis'
import { clearCart } from '../Cart/cart.actions'
import { setUserOrderHistory, setOrderDetails, setAdminOrderHistory, setAdminOrderDetails } from "./orders.actions";


export function* getUserOrderHistory({ payload }) {
    try {
        const history = yield handleGetUserOrderHistory(payload);
        yield put(
            setUserOrderHistory(history)
        );

    } catch(err) {
        console.log(err);
    }
}

export function* onGetUserOrderHistoryStart() {
    yield takeLatest(ordersTypes.GET_USER_ORDER_HISTORY_START, getUserOrderHistory);
};

export function* saveOrder({ payload }) {
    try {
        const timestamps = new Date();
        yield handleSaveOrder({
            ...payload,
            orderUserID: auth.currentUser.uid,
            orderCreatedDate: timestamps
        });
        yield put(
            clearCart()
        )

    } catch (err) {
        console.log(err);
    }
};

export function* onSaveOrderHistoryStart() {
    yield takeLatest(ordersTypes.SAVE_ORDER_HISTORY_START, saveOrder);
};

export function* getOrderDetails({ payload }) {
    try {
        const order = yield handleGetOrder(payload);
        yield put(
            setOrderDetails(order)
        )
    } catch(err) {
        console.log(err);
    }
}

export function* onGetOrderDetailsStart() {
    yield takeLatest(ordersTypes.GET_ORDER_DETAILS_START,getOrderDetails);
};

export function* getAdminOrderHistory({ payload }) {
    try {
        const history = yield handleGetAdminOrderHistory(payload);
        yield put(
            setAdminOrderHistory(history)
        );

    } catch(err) {
        console.log(err);
    }
}

export function* onGetAdminOrderHistoryStart() {
    yield takeLatest(ordersTypes.GET_ADMIN_ORDER_HISTORY_START,getAdminOrderHistory);
}

export function* getAdminOrderDetails({ payload }) {
    try {
        const order = yield handleAdminGetOrder(payload);
        yield put(
            setAdminOrderDetails(order)
        )

    } catch(err) {
        console.log(err);
    }
}

export function* onGetAdminOrderDetailsStart() {
    yield takeLatest(ordersTypes.GET_ADMIN_ORDER_DETAILS_START,getAdminOrderDetails);
};

export default function* ordersSagas() {
    yield all([
        call(onSaveOrderHistoryStart),
        call(onGetUserOrderHistoryStart),
        call(onGetOrderDetailsStart),
        call(onGetAdminOrderHistoryStart),
        call(onGetAdminOrderDetailsStart),
    ])
}
