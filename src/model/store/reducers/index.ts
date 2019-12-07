import { combineReducers } from 'redux';

import repositories from "./repositories";
import selectedRepository from "./select-repository";
import apiRequest from "./api-request";


export default combineReducers({
    repositories,
    selectedRepository,
    apiRequest,
});