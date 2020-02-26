import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEntries } from '../../actions/entry';
import { Loader, Accordion, Icon } from 'semantic-ui-react';

const EntryList = ({ getEntries, loading, entries }) => {
    useEffect(() => {
        setTimeout(() => getEntries(), 2000);
    }, [getEntries]);

    const [state, setState] = useState({
        activeIndex: -1
    });

    const { activeIndex } = state;

    const handleClick = entryId => {
        if (state.activeIndex === entryId) {
            setState({
                ...state,
                activeIndex: -1
            });
        } else {
            setState({
                ...state,
                activeIndex: entryId
            });
        }
    };

    return (
        <Fragment>
            {loading && <Loader active />}
            {entries.map(entry => (
                <Accordion fluid styled key={entry._id}>
                    <Accordion.Title
                        active={activeIndex === entry._id}
                        index={entry._id}
                        onClick={() => handleClick(entry._id)}
                    >
                        <Icon name='dropdown' />
                        {entry.title}
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === entry._id}>
                        {entry.content}
                    </Accordion.Content>
                </Accordion>
            ))}
        </Fragment>
    );
};

EntryList.propTypes = {
    getEntries: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    entries: PropTypes.array
};

const mapStateToProps = state => ({
    loading: state.entry.loading,
    entries: state.entry.entries
});

export default connect(mapStateToProps, { getEntries })(EntryList);
