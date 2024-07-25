import React, { useEffect, useState } from 'react';

// sideEffects:
import { getTestAlarms } from '../sideEffects/sideEffects';

export default function Overview() {

    // states:
    const [alarms, setAlarms] = useState([]);

    useEffect(() => {
        async function fetchAlarms() {
            const fetchedAlarms = await getTestAlarms();
            setAlarms(fetchedAlarms || []);
        }
        fetchAlarms();
    }, []);

    const daysOfWeek = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

    return (
        <div style={{ display: "flex", justifyContent: "start", flexDirection: "column", alignItems: "start", padding: "15px", gap: "5px" }}>
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
        </div>
    );
}