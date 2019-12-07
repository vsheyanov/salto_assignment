import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {Provider} from "react-redux";
import RepositoriesView from './repositories-view/repositories-view';
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
                    <Route exact path="/" component={ RepositoriesView }/>
                    <Route path="/repo/:owner/:repo" component={ Repository }/>
                </Switch>
            </MainView>
        </Router>
    </Provider>
);

export default Root;
