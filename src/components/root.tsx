import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {Provider} from "react-redux";
import RepositoriesList from './repositories-list';
import Repository from './repository';
import MainView from './main-view';

interface Props {
    store: any;
}

const Root: React.FC<Props> = ({ store }) => (
    <Provider store={ store }>
        <Router>
            <MainView>
                <Switch>
                    <Route exact path="/" component={ RepositoriesList }/>
                    <Route path="/repo/:owner/:repo" component={ Repository }/>
                </Switch>
            </MainView>
        </Router>
    </Provider>
);

export default Root;
