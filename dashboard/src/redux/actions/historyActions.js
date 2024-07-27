import { getHistoryAlarms } from '../../sideEffects/sideEffects';
import { updateAlarmData } from '../../sideEffects/sideEffects';
import { addAlarmData } from '../../sideEffects/sideEffects';

export const fetchAlarms = () => async (dispatch) => {
    dispatch({ type: 'FETCH_ALARMS_REQUEST' });
    try {
        const fetchedAlarms = await getHistoryAlarms();
        dispatch({ type: 'FETCH_ALARMS_SUCCESS', payload: fetchedAlarms });
    } catch (error) {
        dispatch({ type: 'FETCH_ALARMS_FAILURE' });
    }
};

export const updateAlarm = (alarm) => async (dispatch) => {
    try {
        await updateAlarmData(alarm);
        dispatch({ type: 'UPDATE_ALARM', payload: alarm });
    } catch (error) {
        dispatch({ type: 'UPDATE_ALARM_FAILURE', error });
    }
};

export const addAlarm = (alarm) => async (dispatch) => {
    try {
        await addAlarmData(alarm)
        dispatch({ type: 'ADD_ALARM', payload: alarm })
    } catch (error) {
        dispatch({ type: 'ADD_ALARM_FAILURE', error })
    }
}