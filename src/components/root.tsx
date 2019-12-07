import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {Provider} from "react-redux";
import App from './App';
import Repository from './repository';

interface Props {
    store: any;
}

const Root: React.FC<Props> = ({ store }) => (
    <Provider store={ store }>
        <Router>
            <Route exact path="/" component={ App }/>
            <Route path="/repo/:owner/:repo" component={ Repository }/>

        </Router>
    </Provider>
);

export default Root;
