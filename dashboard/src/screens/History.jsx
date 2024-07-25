import React, { useEffect, useState } from 'react';
import { Text, Timeline } from '@mantine/core';
import { IconFlame, IconBookmark } from '@tabler/icons-react';
import { getHistoryAlarms } from '../sideEffects/sideEffects';
import Skeleton2 from '../components/skeletons/Skeleton2';
import { Badge } from '@mantine/core';

export default function History() {

    // states
    const [historyAlarms, setHistoryAlarms] = useState([]);
    const [historyAlarmsLoading, setHistoryAlarmsLoading] = useState(false);

    // useEffects
    useEffect(() => {
        async function fetchAlarms() {
            setHistoryAlarmsLoading(true);
            const fetchedAlarms = await getHistoryAlarms();
            const sortedAlarms = sortAlarmsByTimestamp(fetchedAlarms || []);
            setHistoryAlarms(sortedAlarms);
            setHistoryAlarmsLoading(false);
            console.log(sortedAlarms);
        }
        fetchAlarms();
    }, []);

    // sort alarms by timestamp
    function sortAlarmsByTimestamp(alarms) {
        return alarms.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }

    // function to format timestamp to readable date and time
    function alarmTime(timestamp) {
        const date = new Date(timestamp * 1000);
        const formattedDate = date.toLocaleDateString('de-DE');
        const formattedTime = date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
        return ("Alarmierung am " + formattedDate + " um " + formattedTime + " Uhr");
    }

    return (
        <div style={{ display: "flex", justifyContent: "start", flexDirection: "column", alignItems: "start", padding: "15px", gap: "5px" }}>
            {historyAlarmsLoading ? (
                <><Skeleton2/><Skeleton2/><Skeleton2/><Skeleton2/></>
            ) : (
                <Timeline active={historyAlarms.length-1} bulletSize={26} lineWidth={4} reverseActive color="gray">
                    {historyAlarms.map((alarm, index) => (
                        <Timeline.Item key={index} title={
                            <>
                              {alarm.title}{!alarm.positiv && (
                                <Badge color="gray" radius="sm" variant="light" style={{ marginLeft: '0.5rem' }}>
                                  Negativ
                                </Badge>
                              )}
                            </>}
                            lineVariant={alarm.test ? "dashed" : "solid"}
                            bullet={alarm.test ? <IconBookmark size="1.2rem" /> : <IconFlame size="1.2rem" />} color='red'>
                            {alarm.note && <Text c="dimmed" size="sm">Notiz: {alarm.note}</Text>}
                            <Text c="dimmed" size="sm">(#{alarm.uuid})</Text>
                            <Text size="xs" mt={4}>{alarmTime(alarm.timestamp)}</Text>
                        </Timeline.Item>
                    ))}
                </Timeline>
            )}
        </div>
    );
}