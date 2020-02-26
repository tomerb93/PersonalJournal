import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './components/layout/NavBar';
import Dashboard from './components/layout/Dashboard';
import Alert from './components/layout/Alert';
import { loadUser } from './actions/auth';
import { Provider } from 'react-redux'; // Combines Redux to React
import store from './store'; // Store passed below
import setAuthToken from './utils/setAuthToken';

if (localStorage.getItem('token')) {
    setAuthToken(localStorage.getItem('token'));
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <NavBar />
                    <Alert />
                    <Switch>
                        <Dashboard />
                    </Switch>
                </Fragment>
            </Router>
        </Provider>
    );
};

export default App;
