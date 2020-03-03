import React from 'react';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Entry from '../entries/Entry';
import { Container, Segment } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
const Dashboard = () => {
    return (
        <Container>
            <Segment>
                <Route exact path='/' component={Entry} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
            </Segment>
        </Container>
    );
};

export default Dashboard;
