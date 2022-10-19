import feedbackTypes from "./feebacks.types";

const INITIAL_STATE = {
    feedbacks: []
};

const feedbackReducer = (state = INITIAL_STATE,action) => {
    switch(action.type){
        case feedbackTypes.SET_FEEDBACKS:
            return {
                ...state,
                feedbacks: action.payload
            }
        default: 
            return state;
    }
};

export default feedbackReducer;