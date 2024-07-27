const initialState = {
    historyAlarms: [],
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
        default:
            return state;
    }
};

export default historyReducer;
