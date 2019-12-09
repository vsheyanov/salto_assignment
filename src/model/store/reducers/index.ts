import { combineReducers } from 'redux';

import apiRequest from "./api-request";
import privateToken from "./private-token";


export default combineReducers({
    apiRequest,
    privateToken,
});