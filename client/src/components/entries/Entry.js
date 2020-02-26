import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import EntryList from './EntryList';

const Entry = ({ isAuthenticated }) => {
    if (!isAuthenticated) {
        return <Redirect to='/login' />;
    }

    return (
        <Fragment>
            <EntryList />
        </Fragment>
    );
};

Entry.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(Entry);
