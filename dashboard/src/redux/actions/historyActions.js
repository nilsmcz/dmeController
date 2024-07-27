import { getHistoryAlarms } from '../../sideEffects/sideEffects';

export const fetchAlarms = () => async (dispatch) => {
    dispatch({ type: 'FETCH_ALARMS_REQUEST' });
    try {
        const fetchedAlarms = await getHistoryAlarms();
        const sortedAlarms = Object.values(fetchedAlarms).sort((a, b) => new Date(b.timestamp * 1000) - new Date(a.timestamp * 1000));
        console.log(sortedAlarms);
        dispatch({ type: 'FETCH_ALARMS_SUCCESS', payload: sortedAlarms });
    } catch (error) {
        dispatch({ type: 'FETCH_ALARMS_FAILURE' });
    }
};
