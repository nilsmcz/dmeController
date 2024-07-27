const initialState = {
    historyAlarms: {},
    loading: false,
};

const historyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_ALARMS_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'FETCH_ALARMS_SUCCESS':
            return {
                ...state,
                historyAlarms: action.payload,
                loading: false,
            };
        case 'FETCH_ALARMS_FAILURE':
            return {
                ...state,
                loading: false,
            };
        case 'UPDATE_ALARM':
            const updatedAlarm = action.payload;
            return {
                ...state,
                historyAlarms: {
                    ...state.historyAlarms,
                    [updatedAlarm.uid]: updatedAlarm,
                },
            };
        case 'UPDATE_ALARM_FAILURE':
            return {
                ...state,
                error: action.error,
            };
        case 'ADD_ALARM':
            const newAlarm = action.payload;
            return {
                ...state,
                historyAlarms: {
                    ...state.historyAlarms,
                    [newAlarm.uid]: newAlarm,
                },
            }
        case 'ADD_ALARM_FAILURE':
            return {
                ...state,
                error: action.error,
            }
        default:
            return state;
    }
};

export default historyReducer;
