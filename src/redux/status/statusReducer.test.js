import actionTypes from './actionTypes';
import statusReducer from './statusReducer';

test('state is changing after startLoading action creator', () => {
    const newState = statusReducer(undefined, { type: actionTypes.START_LOADING });
    expect(newState.loading).toBe(true);
})

test('state is changing after stopLoading action creator', () => {
    const newState = statusReducer(undefined, { type: actionTypes.STOP_LOADING });
    expect(newState.loading).toBe(false);
})

test('state is changing after startPageLoading action creator', () => {
    const newState = statusReducer(undefined, { type: actionTypes.START_PAGE_LOADING });
    expect(newState.pageLoading).toBe(true);
})

test('state is changing after stopPageLoading action creator', () => {
    const newState = statusReducer(undefined, { type: actionTypes.STOP_PAGE_LOADING });
    expect(newState.pageLoading).toBe(false);
})