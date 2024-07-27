import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, Timeline } from '@mantine/core';
import { IconFlame, IconBookmark } from '@tabler/icons-react';
import { fetchAlarms } from '../redux/actions/historyActions';
import Skeleton2 from '../components/skeletons/Skeleton2';
import { Badge } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Drawer } from '@mantine/core';
import HistoryEditEntryModal from './HistoryEditEntryModal';
import { ActionIcon } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import HistorNewEntryDrawer from './HistorNewEntryDrawer';

export default function History() {

    const dispatch = useDispatch();
    const historyAlarms = useSelector(state => state.history.historyAlarms);
    const loading = useSelector(state => state.history.loading);

    const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false);
    const [openedNew, { open: openNew, close: closeNew }] = useDisclosure(false);

    const [currentAlarmUid, setCurrentAlarmUid] = useState({});

    const [newUid, setNewUid] = useState('00000');

    const generateRandomUid = () => {
        const number = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
        setNewUid(number);
    };

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
        openEdit();
    }

    function isTestAlarm(alarm) {
        return alarm.alarmType === 'test';
    }

    function openNewAlarm() {
        generateRandomUid();
        openNew();
    }

    const alarmsArray = Object.values(historyAlarms).sort((a, b) => b.timestamp - a.timestamp);

    return (
        <>
            <Drawer opened={openedNew} onClose={closeNew} title={"Neue Alarmierung #" + newUid} position="bottom">
                <HistorNewEntryDrawer newUid={newUid} close={closeNew}/>
            </Drawer>

            <Modal opened={openedEdit} onClose={closeEdit} title={"Alarmierung #" + currentAlarmUid} centered>
                <HistoryEditEntryModal alarmUid={currentAlarmUid} close={closeEdit}/>
            </Modal>

            <div style={{display:"flex", position:"fixed", bottom:"15px", right:"15px"}}>
                <ActionIcon variant="filled" color="red" aria-label="add Alarm" size={45} onClick={()=>openNewAlarm()} radius="md">
                    <IconPlus style={{ width: '70%', height: '70%' }} stroke={2.0} color='white'/>
                </ActionIcon>
            </div>

            <div style={{ display: "flex", justifyContent: "start", flexDirection: "column", alignItems: "start", padding: "15px", gap: "5px" }}>
                {loading ? (
                    <><Skeleton2 /><Skeleton2 /><Skeleton2 /><Skeleton2 /></>
                ) : (
                    <Timeline active={alarmsArray.length - 1} bulletSize={26} lineWidth={4} reverseActive color="gray">
                        {alarmsArray.map((alarm, index) => (
                            <Timeline.Item style={{ cursor: 'pointer' }} onClick={() => openHistoryEditEntryModal(alarm.uid)} key={index} title={
                                <>
                                    {alarm.title}{(alarm.alarmType) == 'negative' && (
                                        <Badge color="gray" radius="sm" variant="light" style={{ marginLeft: '0.5rem' }}>
                                            Negativ
                                        </Badge>
                                    )}
                                </>}
                                lineVariant={isTestAlarm(alarm) ? "dashed" : "solid"}
                                bullet={isTestAlarm(alarm) ? <IconBookmark size="1.2rem" /> : <IconFlame size="1.2rem" />} color={isTestAlarm(alarm) ? "rgba(176, 176, 176, 1)" : "red"}>
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
