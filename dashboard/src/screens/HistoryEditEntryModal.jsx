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

export default function HistoryEditEntryModal({ alarmUid, closeModal }) {

    const dispatch = useDispatch();
    const historyAlarms = useSelector(state => state.history.historyAlarms);
    const loading = useSelector(state => state.history.loading);

    const [title, setTitle] = useState(historyAlarms[alarmUid]?.title || "");
    const [note, setNote] = useState(historyAlarms[alarmUid]?.note || "");
    const [timestamp, setTimestamp] = useState(historyAlarms[alarmUid]?.timestamp || moment().unix());
    const [alarmType, setAlarmType] = useState(historyAlarms[alarmUid]?.alarmType || 'positive');
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [opened, { open, close }] = useDisclosure(false);

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
        setSaving(true);
        const updatedAlarm = {
            uid: alarmUid,
            title,
            note,
            timestamp: timestamp,
            alarmType,
        };
        dispatch(updateAlarmAction(updatedAlarm));
        closeModal();
        setSaving(false);
    };

    function deleteAlarm(){
        setDeleting(true)
        // delete alarm
        close()
        closeModal()
        setDeleting(false)
    }

    return (
        <>
            <Modal opened={opened} onClose={close} centered withCloseButton={false} size="xs">
                <div style={{display:"flex", flexDirection:"row", width:"100%", height:"auto"}}>
                    <Button variant="transparent" color="black" fullWidth onClick={()=>deleteAlarm()} loading={deleting} loaderProps={{ type: 'dots' }}>Löschen</Button>
                    <Button variant="filled" color="red" fullWidth onClick={close}>Abbrechen</Button>
                </div>
            </Modal>
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

                <div style={{display:"flex", width:"100%", justifyContent:"center", paddingTop:"10px"}}>
                    <img src={trash} alt="trash icon" style={{ width: 'auto', height: '20px', cursor: 'pointer'}} onClick={open}/>
                </div>

                <Button variant="filled" color="red" style={{ marginTop: "10px" }} onClick={updateAlarm} loading={saving} loaderProps={{ type: 'dots' }}>
                    Speichern
                </Button>

            </div>
        </>
    );
}
