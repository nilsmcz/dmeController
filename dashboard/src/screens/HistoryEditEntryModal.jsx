import React, { useEffect } from 'react';
import { TextInput } from '@mantine/core';
import { Textarea } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useState } from 'react';
import moment from 'moment';
import { SegmentedControl } from '@mantine/core';
import { Text } from '@mantine/core';
import { Button } from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAlarms } from '../redux/actions/historyActions';

export default function HistoryEditEntryModal({ alarmUid }) {

    const dispatch = useDispatch();
    const historyAlarms = useSelector(state => state.history.historyAlarms);
    const loading = useSelector(state => state.history.loading);

    const [title, setTitle] = React.useState(historyAlarms[alarmUid].title);
    const [note, setNote] = React.useState(historyAlarms[alarmUid].note);
    const [time, setTime] = useState(historyAlarms[alarmUid].timestamp);
    const [positive, setPositive] = useState(historyAlarms[alarmUid].positive);

    const handleChange = (value) => {
        const timestamp = moment(value).unix();
        setTime(timestamp);
        console.log(timestamp);
    };

    useEffect(() => {
        if(loading) {
            dispatch(fetchAlarms());
        }
    }, [dispatch, loading]);


    return (
        <div style={{display:"flex", flexDirection:"column", gap:"5px"}}>

            <TextInput
                value={title}
                label="Titel"
                // description=""
                placeholder="Titel des Alarms"
                onChange={(event) => setTitle(event.currentTarget.value)}
            />

            <DateTimePicker
                dropdownType="modal"
                label="Datum und Uhrzeit auswählen"
                placeholder="Datum und Uhrzeit auswählen"
                value={moment.unix(time).toDate()}
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
                // description=""
                placeholder="Notiz zum Alarm"
                value={note}
                onChange={(event) => setNote(event.currentTarget.value)}
                minRows={2}
                maxRows={10}
            />

            <Button variant="filled" color="red" style={{marginTop:"10px"}}>Speichern</Button>

        </div>
    );
}
