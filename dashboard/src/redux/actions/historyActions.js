import { getHistoryAlarms } from '../sideEffects/sideEffects';

export const fetchAlarms = () => async (dispatch) => {
    dispatch({ type: 'FETCH_ALARMS_REQUEST' });
    try {
        const fetchedAlarms = await getHistoryAlarms();
        const sortedAlarms = fetchedAlarms.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        dispatch({ type: 'FETCH_ALARMS_SUCCESS', payload: sortedAlarms });
    } catch (error) {
        dispatch({ type: 'FETCH_ALARMS_FAILURE' });
    }
};