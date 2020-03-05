import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import EntryList from './EntryList';
import EntryDailyProgress from './EntryDailyProgress';
import { Divider } from 'semantic-ui-react';

const Entry = ({ isAuthenticated }) => {
    if (!isAuthenticated) {
        return <Redirect to='/login' />;
    }

    return (
        <div className='Entry'>
            <EntryDailyProgress />
            <Divider />
            <EntryList />
        </div>
    );
};

Entry.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(Entry);
