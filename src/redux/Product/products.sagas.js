import { auth } from '../../Firebase/utilis';
import { takeLatest, put, all, call} from 'redux-saga/effects';
import ProductsTypes from './products.types';
import { handleAddProduct, handleEditProduct ,handleFetchProducts, handleDeleteProduct } from './products.helpers';
import { setProducts, fetchProductsStart } from './products.actions';

export function* addProduct({ payload }) {

    try {
        const timestamp = new Date();
        yield handleAddProduct({
            ...payload,
            productAdminUserUID: auth.currentUser.uid,
            createDate: timestamp
        });
        yield put(
            fetchProductsStart(auth.currentUser.uid)
        );

    } catch (err) {
        console.log(err);
    }
}

export function* onAddProductStart() {
    yield takeLatest(ProductsTypes.ADD_NEW_PRODUCT_START, addProduct );
}

export function* editProduct({ payload }) {

    try {
        yield handleEditProduct({
            ...payload
        });
        yield put(
            fetchProductsStart(auth.currentUser.uid)
        );
    } catch(err) {
        console.log(err);
    }
}

export function* onEditProductStart() {
    yield takeLatest(ProductsTypes.EDIT_PRODUCT_START,editProduct )
}

export function* fetchProducts( { payload } ) {
    try{
        const products = yield handleFetchProducts(payload);
        yield put(
            setProducts(products)
        )
    } catch(err) {
        console.log(err);
    }
}

export function* onFetchProductsStart() {
    yield takeLatest(ProductsTypes.FETCH_PRODUCTS_START, fetchProducts );
}

export function* deleteProduct ( { payload }) {
    try{
        yield handleDeleteProduct(payload);
        yield put (
            fetchProductsStart(auth.currentUser.uid)
        );
    } catch (err) {
        console.log(err);
    }
}

export function* onDeleteProductStart() {
    yield takeLatest(ProductsTypes.DELETE_PRODUCT_START, deleteProduct )
}



export default function* productSagas() {
    yield all([
        call(onAddProductStart),
        call(onEditProductStart),
        call(onFetchProductsStart),
        call(onDeleteProductStart)
    ])
}