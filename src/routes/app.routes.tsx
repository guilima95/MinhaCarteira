import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../components/Layout';

import Dashoard from '../pages/Dashboard';
import Entradas from '../pages/Entradas';
import List from '../pages/List';

const AppRoutes: React.FC = () => (
    <Layout>

        <Switch>
            <Route path="/dashboard" exact component={Dashoard} />
            <Route path="/list/:type" exact component={List} />
            <Route path="/entradas/:type" exact component={Entradas} />


        </Switch>
    </Layout>

);

export default AppRoutes;

