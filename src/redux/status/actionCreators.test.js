import actionTypes from "./actionTypes";
import { setError, setSuccessMessage, startLoading, stopLoading } from "./actionCreators";

describe('setSuccessMessage', () => {
    test('returns an action with type SET_SUCCESS and correct payload', () => {
        const message = "This is an example message"
        const action = setSuccessMessage(message);
        expect(action).toEqual({ type: actionTypes.SET_SUCCESS, payload: message });
    })
})

describe('setError', () => {
    test('returns an action with type SET_ERROR and correct payload', () => {
        const message = "This is an example error message"
        const action = setError(message);
        expect(action).toEqual({ type: actionTypes.SET_ERROR, payload: message });
    })
})

describe('startLoading', () => {
    test('returns an action with type START_LOADING', () => {
        const action = startLoading();
        expect(action).toEqual({ type: actionTypes.START_LOADING });
    })
})

describe('stopLoading', () => {
    test('returns an action with type STOP_LOADING', () => {
        const action = stopLoading();
        expect(action).toEqual({ type: actionTypes.STOP_LOADING });
    })
})