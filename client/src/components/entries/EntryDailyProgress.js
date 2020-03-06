import React from 'react';
import PropTypes from 'prop-types';
import { Progress, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';

const EntryDailyProgress = ({ dailyEntryGoal, entries }) => {
    const getProgressPercent = () => {
        let currDate = new Date();
        let entryCount = 0;
        for (let i = 0; i < entries.length; i++) {
            if (
                parseInt(entries[i].date.substring(8, 10)) ===
                    currDate.getDate() &&
                parseInt(entries[i].date.substring(5, 7)) ===
                    currDate.getMonth() + 1 &&
                parseInt(entries[i].date.substring(0, 4)) ===
                    currDate.getFullYear()
            ) {
                entryCount++;
            }
        }

        if ((entryCount / dailyEntryGoal) * 100 > 100) {
            return {
                value: 100,
                count: entryCount
            };
        } else {
            return {
                value: (entryCount / dailyEntryGoal) * 100,
                count: entryCount
            };
        }
    };

    return (
        <>
            <Header>Your daily progress</Header>
            <Progress
                percent={getProgressPercent().value}
                indicating
            >{`You've posted ${
                getProgressPercent().count
            } out of ${dailyEntryGoal} entries.`}</Progress>
        </>
    );
};

EntryDailyProgress.propTypes = {
    dailyEntryGoal: PropTypes.number.isRequired,
    entries: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    dailyEntryGoal: state.auth.user?.dailyEntryGoal,
    entries: state.entry.entries
});

export default connect(mapStateToProps, {})(EntryDailyProgress);
