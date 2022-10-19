import ordersTypes from './orders.types'

const INITIAL_STATE = {
    orderHistory: [],
    orderDetails: {},
    orderAdminHistory: [],
    orderAdminDetails: {},
};

const ordersReducer = (state=INITIAL_STATE, action ) => {
    switch(action.type){
        case ordersTypes.SET_USER_ORDER_HISTORY:
            return {
                ...state,
                orderHistory: action.payload
            };
        case ordersTypes.SET_ORDER_DETAILS:
            return {
                ...state,
                orderDetails: action.payload
            };
        case ordersTypes.SET_ADMIN_ORDER_HISTORY:
            return {
                ...state,
                orderAdminHistory: action.payload
            };
        case ordersTypes.SET_ADMIN_ORDER_DETAILS:
            return {
                ...state,
                orderAdminDetails: action.payload
            };
        default:
            return state;
    }
};

export default ordersReducer;