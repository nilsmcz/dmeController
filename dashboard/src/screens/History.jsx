import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, Timeline } from '@mantine/core';
import { IconFlame, IconBookmark } from '@tabler/icons-react';
import { fetchAlarms } from '../redux/actions/historyActions';
import Skeleton2 from '../components/skeletons/Skeleton2';
import { Badge } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import HistoryEditEntryModal from './HistoryEditEntryModal';

export default function History() {

    const dispatch = useDispatch();
    const historyAlarms = useSelector(state => state.history.historyAlarms);
    const loading = useSelector(state => state.history.loading);

    const [opened, { open, close }] = useDisclosure(false);
    const [currentAlarmUid, setCurrentAlarmUid] = useState({});

    useEffect(() => {
        dispatch(fetchAlarms());
    }, [dispatch]);

    function alarmTime(timestamp) {
        const date = new Date(timestamp * 1000);
        const formattedDate = date.toLocaleDateString('de-DE');
        const formattedTime = date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
        return ("Alarmierung am " + formattedDate + " um " + formattedTime + " Uhr");
    }

    function openHistoryEditEntryModal(alarmUid) {
        setCurrentAlarmUid(alarmUid);
        open();
    }

    const alarmsArray = Object.values(historyAlarms).sort((a, b) => b.timestamp - a.timestamp);

    return (
        <>
            <Modal opened={opened} onClose={close} title={"Alarmierung #" + currentAlarmUid} centered>
                <HistoryEditEntryModal alarmUid={currentAlarmUid} />
            </Modal>

            <div style={{ display: "flex", justifyContent: "start", flexDirection: "column", alignItems: "start", padding: "15px", gap: "5px" }}>
                {loading ? (
                    <><Skeleton2 /><Skeleton2 /><Skeleton2 /><Skeleton2 /></>
                ) : (
                    <Timeline active={alarmsArray.length - 1} bulletSize={26} lineWidth={4} reverseActive color="gray">
                        {alarmsArray.map((alarm, index) => (
                            <Timeline.Item onClick={() => openHistoryEditEntryModal(alarm.uid)} key={index} title={
                                <>
                                    {alarm.title}{(alarm.positive) == false && (
                                        <Badge color="gray" radius="sm" variant="light" style={{ marginLeft: '0.5rem' }}>
                                            Negativ
                                        </Badge>
                                    )}
                                </>}
                                lineVariant={alarm.test ? "dashed" : "solid"}
                                bullet={alarm.test ? <IconBookmark size="1.2rem" /> : <IconFlame size="1.2rem" />} color='red'>
                                {alarm.note && <Text c="dimmed" size="sm">Notiz: {alarm.note}</Text>}
                                <Text c="dimmed" size="sm">(#{alarm.uid})</Text>
                                <Text size="xs" mt={4}>{alarmTime(alarm.timestamp)}</Text>
                            </Timeline.Item>
                        ))}
                    </Timeline>
                )}
            </div>
        </>
    );
}
