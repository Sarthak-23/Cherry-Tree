import RestaurantsTypes from "./restaurants.types";

const INITIAL_STATE = {
    restaurants: []
};

const RestaurantsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case RestaurantsTypes.SET_RESTAURANTS:
            return {
                ...state,
                restaurants: action.payload
            }
        default:
            return state;
    }
};

export default RestaurantsReducer; 