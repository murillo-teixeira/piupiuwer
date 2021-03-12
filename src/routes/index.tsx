import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route'


import Feed from '../pages/Feed';
import Login from '../pages/Login';
import Redirection from './redirect';

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/feed" component={Feed} isPrivate/>
            <Route path="/login" component={Login} />
            <Route component={Redirection}/>
        </Switch>
    );
}

export default Routes;