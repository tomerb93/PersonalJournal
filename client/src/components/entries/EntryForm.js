import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const EntryForm = props => {
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
        <Fragment>
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
        </Fragment>
    );
};

EntryForm.propTypes = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(EntryForm);
