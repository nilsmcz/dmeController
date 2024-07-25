import React, { useEffect, useState } from 'react';
import { Text, Timeline } from '@mantine/core';
import { IconFlame } from '@tabler/icons-react';
import { getHistoryAlarms } from '../sideEffects/sideEffects';
import Skeleton2 from '../components/skeletons/Skeleton2';

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
                <Timeline active={historyAlarms.length-1} bulletSize={24} lineWidth={3} reverseActive color="gray">
                    {historyAlarms.map((alarm, index) => (
                        <Timeline.Item key={index} title={alarm.title} bullet={<IconFlame size="1.0rem" />} color='red'>
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


{/* 
    
    <Timeline active={1} bulletSize={24} lineWidth={3} reverseActive color="gray">
        <Timeline.Item title="New branch" bullet={<IconFlame size="0.8rem" />}>
            <Text c="dimmed" size="sm">You&apos;ve created new branch <Text variant="link" component="span" inherit>fix-notifications</Text> from master</Text>
            <Text size="xs" mt={4}>2 hours ago</Text>
        </Timeline.Item>

        <Timeline.Item title="Commits">
            <Text c="dimmed" size="sm">You&apos;ve pushed 23 commits to<Text variant="link" component="span" inherit>fix-notifications branch</Text></Text>
            <Text size="xs" mt={4}>52 minutes ago</Text>
        </Timeline.Item>

        <Timeline.Item title="Pull request" lineVariant="dashed" color="red" bullet={<IconFlame size="1.0rem" color="white"/>}>
            <Text c="dimmed" size="sm">You&apos;ve submitted a pull request<Text variant="link" component="span" inherit>Fix incorrect notification message (#187)</Text></Text>
            <Text size="xs" mt={4}>34 minutes ago</Text>
        </Timeline.Item>

        <Timeline.Item title="Code review">
            <Text c="dimmed" size="sm"><Text variant="link" component="span" inherit>Robert Gluesticker</Text> left a code review on your pull request</Text>
            <Text size="xs" mt={4}>12 minutes ago</Text>
        </Timeline.Item>
    </Timeline> 

*/}