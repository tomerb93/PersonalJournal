import React, { useState } from 'react';
import { Form, Header, Label, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../../actions/auth';
import { Redirect, Link } from 'react-router-dom';

const Login = ({ loginUser, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onSubmit = () => {
        loginUser({ email, password });
    };

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    if (isAuthenticated) {
        return <Redirect to='/' />;
    }

    return (
        <>
            <Header>Sign In</Header>
            <Label>Please fill in the following fields</Label>
            <Divider />
            <Form onSubmit={onSubmit}>
                <Form.Input
                    value={email}
                    onChange={e => onChange(e)}
                    type='email'
                    label='Email'
                    name='email'
                    required
                ></Form.Input>
                <Form.Input
                    value={password}
                    onChange={e => onChange(e)}
                    type='password'
                    label='Password'
                    name='password'
                    required
                ></Form.Input>
                <Form.Button primary>Login</Form.Button>
            </Form>
            <Divider />
            <p>No account?</p>
            <Link to='/register'>Sign up</Link>
        </>
    );
};

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { loginUser })(Login);
