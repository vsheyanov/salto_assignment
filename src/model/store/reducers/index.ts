import { combineReducers } from 'redux';

import repositories from "./repositories";
import apiRequest from "./api-request";


export default combineReducers({
    repositories,
    apiRequest,
});