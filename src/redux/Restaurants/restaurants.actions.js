import RestaurantsTypes from "./restaurants.types";

export const fetchRestaurantsStart = () => ({
    type: RestaurantsTypes.FETCH_RESTAURANTS_START
});

export const setRestaurants = restaurants => ({
    type: RestaurantsTypes.SET_RESTAURANTS,
    payload: restaurants
})
