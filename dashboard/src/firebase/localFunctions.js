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