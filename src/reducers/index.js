import { combineReducers } from 'redux';
import ActiveVideoReducer from './ActiveVideoReducer';

export default combineReducers({
    activeVideo: ActiveVideoReducer,
});
