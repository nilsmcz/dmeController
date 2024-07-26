import { combineReducers } from 'redux';
import historyReducer from './historyReducer';

const rootReducer = combineReducers({
    history: historyReducer,
});

export default rootReducer;