import React from 'react';
import ReactDOM from 'react-dom';
import store from './model/store/store';
import Root from './components/root';

import './index.css';


ReactDOM.render(<Root store={ store }/>, document.getElementById('root'));