import ProductsTypes from "./products.types";

export const addProductStart = productData => ({
    type: ProductsTypes.ADD_NEW_PRODUCT_START,
    payload: productData
});

export const editProductStart = editproductData => ({
    type: ProductsTypes.EDIT_PRODUCT_START,
    payload: editproductData
});


export const fetchProductsStart = id => ({
    type: ProductsTypes.FETCH_PRODUCTS_START,
    payload: id
});

export const setProducts = products => ({
    type: ProductsTypes.SET_PRODUCTS,
    payload: products
})

export const deleteProductStart = productID => ({
    type: ProductsTypes.DELETE_PRODUCT_START,
    payload: productID
})