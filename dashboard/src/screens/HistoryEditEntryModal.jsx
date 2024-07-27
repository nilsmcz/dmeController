import React, { useEffect } from 'react';
import { TextInput, Textarea, Button, SegmentedControl, Text } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useState } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAlarms, updateAlarm as updateAlarmAction } from '../redux/actions/historyActions';

export default function HistoryEditEntryModal({ alarmUid, closeModal }) {

    const dispatch = useDispatch();
    const historyAlarms = useSelector(state => state.history.historyAlarms);
    const loading = useSelector(state => state.history.loading);

    const [title, setTitle] = useState(historyAlarms[alarmUid]?.title || "");
    const [note, setNote] = useState(historyAlarms[alarmUid]?.note || "");
    const [timestamp, setTimestamp] = useState(historyAlarms[alarmUid]?.timestamp || moment().unix());
    const [positive, setPositive] = useState(historyAlarms[alarmUid]?.positive || false);

    const handleChange = (value) => {
        const timestamp = moment(value).unix();
        setTimestamp(timestamp);
    };

    useEffect(() => {
        if (loading) {
            dispatch(fetchAlarms());
        }
    }, [dispatch, loading]);

    function updateAlarm(){
        const updatedAlarm = {
            uid: alarmUid,
            title,
            note,
            timestamp: timestamp,
            positive,
        };
        dispatch(updateAlarmAction(updatedAlarm));
        closeModal();
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>

            <TextInput
                value={title}
                label="Titel"
                placeholder="Titel des Alarms"
                onChange={(event) => setTitle(event.currentTarget.value)}
            />

            <DateTimePicker
                dropdownType="modal"
                label="Datum und Uhrzeit auswählen"
                placeholder="Datum und Uhrzeit auswählen"
                value={moment.unix(timestamp).toDate()}
                onChange={handleChange}
                valueFormat="DD.MM.YYYY HH:mm"
            />

            <>
                <Text size="sm" fw={500} mb={0}>
                    Status
                </Text>
                <SegmentedControl
                    data={[
                        { label: 'Positiv', value: 'true' },
                        { label: 'Negativ', value: 'false' },
                    ]}
                    value={positive.toString()}
                    onChange={(value) => setPositive(value === 'true')}
                />
            </>

            <Textarea
                label="Notiz"
                placeholder="Notiz zum Alarm"
                value={note}
                onChange={(event) => setNote(event.currentTarget.value)}
                minRows={2}
                maxRows={10}
            />

            <Button variant="filled" color="red" style={{ marginTop: "10px" }} onClick={updateAlarm}>
                Speichern
            </Button>

        </div>
    );
}
