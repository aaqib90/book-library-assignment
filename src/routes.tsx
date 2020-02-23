import React from 'react';
import { Switch, Route } from "react-router";
import Home from './components/Home';
import BookList from './components/BookList';


const Routes = () => (
    <div>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/list" component={BookList} />
        </Switch>
    </div>
);

export default Routes;