import React, { Fragment } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/auth';

const NavBar = ({ isAuthenticated, loading, logoutUser }) => {
    const guestLink = (
        <Fragment>
            <Dropdown.Item as={Link} to='/register'>
                Sign Up
            </Dropdown.Item>
            <Dropdown.Item as={Link} to='/login'>
                Login
            </Dropdown.Item>
        </Fragment>
    );

    const userLinks = (
        <Fragment>
            <Dropdown.Item>New Entry</Dropdown.Item>
            <Dropdown.Item>View entries</Dropdown.Item>
            <Dropdown.Item onClick={logoutUser}>Logout</Dropdown.Item>
        </Fragment>
    );
    return (
        <Menu attached='top' borderless size='huge'>
            <Menu.Item position='right'>
                <Dropdown icon='settings' direction='left'>
                    <Dropdown.Menu>
                        {!loading && isAuthenticated ? userLinks : guestLink}
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </Menu>
    );
};

NavBar.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading
});

export default connect(mapStateToProps, { logoutUser })(NavBar);
