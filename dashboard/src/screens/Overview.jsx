import React, { useEffect, useState } from 'react';
import { Skeleton } from '@mantine/core';

// sideEffects:
import { getTestAlarms } from '../sideEffects/sideEffects';

//components:
import Skeleton1 from '../components/skeletons/Skeleton1';

export default function Overview() {

    const daysOfWeek = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];

    // states:
    const [alarms, setAlarms] = useState([]);
    const [alarmsLoading, setAlarmsLoading] = useState(false);


    //useEffects:
    useEffect(() => {
        async function fetchAlarms() {
            setAlarmsLoading(true);
            const fetchedAlarms = await getTestAlarms();
            const sortedAlarms = sortAlarms(fetchedAlarms || []);
            setAlarms(sortedAlarms);
            setAlarmsLoading(false);
        }
        fetchAlarms();
    }, []);

    // Function to sort alarms by day and time
    function sortAlarms(alarms) {
        return alarms.sort((a, b) => {
            if (a.day !== b.day) {
                return a.day - b.day;
            }
            if (a.hour !== b.hour) {
                return a.hour - b.hour;
            }
            return a.minute - b.minute;
        });
    };

    return (
        <div style={{ display: "flex", justifyContent: "start", flexDirection: "column", alignItems: "start", padding: "15px", gap: "5px", width:"100vw", height:"100%"}}>

            {/* Testalarms: */}
            {alarmsLoading ? <><Skeleton1/></>:
            <>
                {alarms.map((alarm, index) => {
                    if (!alarm) return null; // Skip null values
                    return (
                        <div key={index}>
                            <div style={{ fontSize: "13px", fontWeight: "500", color: "grey" }}>
                                Jeden {daysOfWeek[alarm.day]} um
                            </div>
                            <div style={{ display: "flex", flexDirection: "row", gap: "30px" }}>
                                <div style={{ fontSize: "19px", fontWeight: "600" }}>
                                    {`${alarm.hour.toString().padStart(2, '0')}:${alarm.minute.toString().padStart(2, '0')} Uhr`}
                                </div>
                                <div style={{ fontSize: "19px", fontWeight: "600" }}>
                                    {`- ${alarm.range.before} Minuten`}
                                </div>
                                <div style={{ fontSize: "19px", fontWeight: "600" }}>
                                    {`+ ${alarm.range.after} Minuten`}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </>
            }

        </div>
    );
}