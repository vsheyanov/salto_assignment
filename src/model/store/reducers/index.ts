import { combineReducers } from 'redux';

import repositories from "./repositories";
import selectedRepository from "./select-repository";


export default combineReducers({ repositories, selectedRepository });