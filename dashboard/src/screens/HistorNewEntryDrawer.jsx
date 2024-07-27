import React, { useEffect } from 'react';
import { TextInput, Textarea, Button, SegmentedControl, Text } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useState } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAlarms, updateAlarm as updateAlarmAction } from '../redux/actions/historyActions';
import trash from '../assets/icons/trash.svg';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import { addAlarm } from '../redux/actions/historyActions';

export default function HistorNewEntryDrawer({ newUid, close }) {

    const dispatch = useDispatch();
    const historyAlarms = useSelector(state => state.history.historyAlarms);
    const loading = useSelector(state => state.history.loading);

    const [title, setTitle] = useState("");
    const [note, setNote] = useState( "");
    const [timestamp, setTimestamp] = useState(moment().unix());
    const [alarmType, setAlarmType] = useState('positive');
    const [saving, setSaving] = useState(false);

    const handleChange = (value) => {
        const timestamp = moment(value).unix();
        setTimestamp(timestamp);
    };

    function createAlarm(){
        setSaving(true);
        const newAlarm = {
            uid: newUid,
            title,
            note,
            timestamp: timestamp,
            alarmType,
        };
        dispatch(addAlarm(newAlarm))
        close()
        setSaving(false);
    }

    return (
        <>
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
                            { label: 'Positiv', value: 'positive' },
                            { label: 'Negativ', value: 'negative' },
                            { label: 'Probealarm', value: 'test' },
                        ]}
                        value={alarmType}
                        onChange={(value) => setAlarmType(value)}
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

                <Button variant="filled" color="red" style={{ marginTop: "10px" }} onClick={()=>createAlarm()} loading={saving} loaderProps={{ type: 'dots' }} fullWidth>
                    Speichern
                </Button>

            </div>
        </>
    )
}
