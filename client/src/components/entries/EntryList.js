import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEntries, deleteEntry } from '../../actions/entry';
import {
    Loader,
    Accordion,
    Icon,
    Button,
    Form,
    Divider,
    Header
} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

const EntryList = ({
    getEntries,
    deleteEntry,
    loading,
    entries,
    isAuthenticated
}) => {
    useEffect(() => {
        getEntries();
    }, [getEntries]);

    const [state, setState] = useState({
        activeIndex: -1,
        editMode: false
    });

    const { activeIndex, editMode } = state;

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

    const toggleEditMode = () => {
        if (state.editMode === true) {
            setState({
                ...state,
                editMode: false
            });
        } else {
            setState({
                ...state,
                editMode: true
            });
        }
    };

    const updateEntry = entryId => {
        console.log(entryId);
    };

    const deleteEntryById = entryId => {
        deleteEntry(entryId);
    };

    if (!isAuthenticated) {
        return <Redirect to='/login' />;
    }

    return (
        <div className='EntryList'>
            {loading && <Loader className='margin-2vh' active />}
            <Header>My Entries</Header>

            {entries.length === 0 ? (
                <Header.Subheader>No entries to show</Header.Subheader>
            ) : (
                entries.map(entry => (
                    <Accordion className='' fluid styled key={entry._id}>
                        <Accordion.Title
                            active={activeIndex === entry._id}
                            index={entry._id}
                            onClick={() => handleClick(entry._id)}
                        >
                            <Icon name='dropdown' />
                            {entry.title}
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === entry._id}>
                            <Form className='EntryList-Content-Form'>
                                <textarea
                                    name='text'
                                    defaultValue={entry.content}
                                    disabled={!editMode}
                                />
                            </Form>
                            <Divider />
                            <Button
                                size='tiny'
                                color='google plus'
                                content='Delete'
                                onClick={() => deleteEntryById(entry._id)}
                            ></Button>
                            {!editMode && (
                                <Button
                                    size='tiny'
                                    color='olive'
                                    content='Edit'
                                    onClick={() => toggleEditMode()}
                                ></Button>
                            )}
                            {editMode && (
                                <>
                                    <Button
                                        size='tiny'
                                        color='grey'
                                        content='Cancel'
                                        onClick={() => toggleEditMode()}
                                    ></Button>
                                    <Button
                                        size='tiny'
                                        color='linkedin'
                                        content='Save'
                                        onClick={() => updateEntry(entry._id)}
                                    ></Button>
                                </>
                            )}
                        </Accordion.Content>
                    </Accordion>
                ))
            )}
        </div>
    );
};

EntryList.propTypes = {
    getEntries: PropTypes.func.isRequired,
    deleteEntry: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    entries: PropTypes.array,
    isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    loading: state.entry.loading,
    entries: state.entry.entries,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getEntries, deleteEntry })(EntryList);
