import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Form from './pages/Form';

export default function Router() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Home} exact/>
                <Route path="/form" component={Form} exact/>
            </Switch>
        </BrowserRouter>
    );
}