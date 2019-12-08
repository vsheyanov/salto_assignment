import { combineReducers } from 'redux';

import repositories from "./repositories";
import apiRequest from "./api-request";
import privateToken from "./private-token";


export default combineReducers({
    repositories,
    apiRequest,
    privateToken,
});