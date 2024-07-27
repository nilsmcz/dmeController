import { ref, set, get } from 'firebase/database';
import { database } from './firebaseConfig';

export async function localGetTestAlarms() {
    const path = 'settings/testAlarm';
    const dataRef = ref(database, path);
    const snapshot = await get(dataRef);

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      throw new Error('No data available');
    }
}

export async function localGetHistoryAlarms() {
    const path = '/history/alarms';
    const dataRef = ref(database, path);
    const snapshot = await get(dataRef);
    
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      throw new Error('No data available');
    }
}

export async function localUpdateAlarmData(updatedAlarm) {
    const path = `/history/alarms/${updatedAlarm.uid}`;
    const dataRef = ref(database, path);
    await set(dataRef, updatedAlarm);
}

export async function localAddAlarmData(newAlarm) {
    const path = `/history/alarms/${newAlarm.uid}`;
    const dataRef = ref(database, path);
    await set(dataRef, newAlarm);
}