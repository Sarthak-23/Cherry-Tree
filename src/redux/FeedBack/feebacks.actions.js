import feedbackTypes from "./feebacks.types";


export const addfeedbackStart = feedbackData => ({
    type: feedbackTypes.ADD_FEEDBACKS_START,
    payload: feedbackData
});

export const fetchFeedbackStart = id => ({
    type: feedbackTypes.FETCH_FEEDBACKS_START,
    payload: id
});

export const setFeedbacks = feedbacks => ({
    type: feedbackTypes.SET_FEEDBACKS,
    payload: feedbacks
})