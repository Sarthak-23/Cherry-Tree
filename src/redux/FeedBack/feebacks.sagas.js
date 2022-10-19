import { takeLatest, call, all, put } from 'redux-saga/effects';
import feedbackTypes from './feebacks.types'
import { setFeedbacks } from './feebacks.actions';
import { handleAddFeedback, handleUpdateRating, handleFetchFeedbacks } from './feebacks.helpers'

export function* addfeedback({ payload }) {
    try{
        const timestamp = new Date();
        yield handleAddFeedback({
            ...payload,
            createDate: timestamp
        });
        yield handleUpdateRating({
            ...payload,
            createDate: timestamp
        });
    } catch(err) {
        console.log(err);
    }
}

export function* onAddFeedbackStart() {
    yield takeLatest(feedbackTypes.ADD_FEEDBACKS_START, addfeedback );
}

export function* fetchFeedbacks({ payload }) {
    // console.log(payload);
    try{
        const feedbacks = yield handleFetchFeedbacks(payload);
        yield put(
            setFeedbacks(feedbacks)
        );
    } catch(err) {
        console.log(err);
    }
}

export function* onFetchFeedbacksStart() {
    yield takeLatest(feedbackTypes.FETCH_FEEDBACKS_START, fetchFeedbacks);
}

export default function* feedbackSagas() {
    yield all([
        call(onAddFeedbackStart),
        call(onFetchFeedbacksStart),
    ])
}