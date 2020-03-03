import React, { Fragment, useState } from 'react';
import { Form, Header, Label, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { registerUser } from '../../actions/auth';
import { Redirect, Link } from 'react-router-dom';

const Register = ({ setAlert, registerUser, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: '',
        gender: ''
    });

    const {
        firstName,
        lastName,
        email,
        password,
        password2,
        gender
    } = formData;

    const onSubmit = () => {
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
            return;
        }

        const name = firstName + ' ' + lastName;

        registerUser({ name, email, password, gender });
    };

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onChangeRadio = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    if (isAuthenticated) {
        return <Redirect to='/' />;
    }

    return (
        <Fragment>
            <Header>Sign Up</Header>
            <Label>Please fill in the following fields</Label>
            <Divider />
            <Form onSubmit={onSubmit}>
                <Form.Group widths='equal'>
                    <Form.Input
                        value={firstName}
                        onChange={e => onChange(e)}
                        label='First Name'
                        name='firstName'
                        required
                    ></Form.Input>
                    <Form.Input
                        value={lastName}
                        onChange={e => onChange(e)}
                        label='Last Name'
                        name='lastName'
                        required
                    ></Form.Input>
                </Form.Group>
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
                <Form.Input
                    value={password2}
                    onChange={e => onChange(e)}
                    type='password'
                    label='Confirm Password'
                    name='password2'
                    required
                ></Form.Input>
                <Form.Group inline>
                    <label>Gender: </label>
                    <Form.Radio
                        label='Male'
                        value={gender}
                        checked={gender === 'M'}
                        onChange={() => onChangeRadio('gender', 'M')}
                    />
                    <Form.Radio
                        label='Female'
                        value={gender}
                        checked={gender === 'F'}
                        onChange={() => onChangeRadio('gender', 'F')}
                    />
                    <Form.Radio
                        label='Other'
                        value={gender}
                        checked={gender === 'O'}
                        onChange={() => onChangeRadio('gender', 'O')}
                    />
                </Form.Group>
                <Form.Button primary>Create account</Form.Button>
            </Form>
            <Divider />
            <p>Already have an account?</p>
            <Link to='/login'>Sign in</Link>
        </Fragment>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, registerUser })(Register);
