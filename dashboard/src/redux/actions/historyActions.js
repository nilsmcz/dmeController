import { getHistoryAlarms } from '../../sideEffects/sideEffects';

export const fetchAlarms = () => async (dispatch) => {
    dispatch({ type: 'FETCH_ALARMS_REQUEST' });
    try {
        const fetchedAlarms = await getHistoryAlarms();
        dispatch({ type: 'FETCH_ALARMS_SUCCESS', payload: fetchedAlarms });
    } catch (error) {
        dispatch({ type: 'FETCH_ALARMS_FAILURE' });
    }
};
