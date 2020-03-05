import React from 'react';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Entry from '../entries/Entry';
import EntryForm from '../entries/EntryForm';
import { Container, Segment } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
const Dashboard = () => {
    return (
        <div className='margin-top-1vh'>
            <Container>
                <Segment>
                    <Route exact path='/' component={Entry} />
                    <Route exact path='/entry' component={EntryForm} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />
                </Segment>
            </Container>
        </div>
    );
};

export default Dashboard;
