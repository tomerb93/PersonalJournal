import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Divider, Form } from 'semantic-ui-react';
import { postEntry, getEntries } from '../../actions/entry';
import { Redirect } from 'react-router-dom';

const EntryForm = ({ postEntry, isAuthenticated, history, getEntries }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });

    const { title, content } = formData;

    const onSubmit = () => {
        postEntry({ title, content });

        setFormData({
            title: '',
            content: ''
        });

        getEntries();

        history.push('/');
    };

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    if (!isAuthenticated) {
        return <Redirect to='/login' />;
    }

    return (
        <>
            <Header>Post an entry</Header>
            <Divider />
            <Form onSubmit={onSubmit}>
                <Form.Input
                    value={title}
                    onChange={e => onChange(e)}
                    type='text'
                    label='Title'
                    name='title'
                    required
                ></Form.Input>
                <Form.TextArea
                    rows='20'
                    value={content}
                    onChange={e => onChange(e)}
                    label='Content'
                    name='content'
                    placeholder="What's on your mind?..."
                    required
                ></Form.TextArea>
                <Form.Button primary>Post</Form.Button>
            </Form>
        </>
    );
};

EntryForm.propTypes = {
    postEntry: PropTypes.func.isRequired,
    getEntries: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { postEntry, getEntries })(EntryForm);
