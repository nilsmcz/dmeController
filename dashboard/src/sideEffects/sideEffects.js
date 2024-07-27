import { localGetHistoryAlarms, localGetTestAlarms, localUpdateAlarmData, localAddAlarmData, localDeleteAlarmData } from '../firebase/localFunctions';

/**
 * Ruft die Testalarme aus der Firebase Realtime Database ab.
 *
 * Diese Funktion verwendet die `localGetTestAlarms`-Funktion, um Daten von der
 * Firebase Realtime Database abzurufen. Sie behandelt Fehler, die beim Abrufen der
 * Daten auftreten können, und gibt entweder die abgerufenen Daten zurück oder
 * wirft den Fehler weiter, wenn etwas schiefgeht.
 *
 * @async
 * @function getTestAlarms
 * @returns {Promise<any>} Ein Promise, das die abgerufenen Testalarme als JSON-Daten enthält.
 * @throws {Error} Wenn ein Fehler beim Abrufen der Daten auftritt, wird dieser Fehler
 *                 weitergeworfen und in der Konsole protokolliert.
 *
 * @example
 * try {
 *   const alarms = await getTestAlarms();
 *   console.log('Testalarme:', alarms);
 * } catch (error) {
 *   console.error('Fehler beim Abrufen der Testalarme:', error);
 * }
 */
export async function getTestAlarms() {
  try {
    const data = await localGetTestAlarms();
    return data;
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
    throw error;
  }
};

export async function getHistoryAlarms() {
  try {
    const data = await localGetHistoryAlarms();
    return data;
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
    throw error;
  }
};

export async function updateAlarmData(updatedAlarm) {
  try {
    await localUpdateAlarmData(updatedAlarm);
  } catch (error) {
    console.error('Fehler beim Aktualisieren der Daten:', error);
    throw error;
  }
};

export async function addAlarmData(newAlarm) {
  try {
    await localAddAlarmData(newAlarm);
  } catch (error) {
    console.error('Fehler beim Hinzufügen der Daten:', error);
    throw error;
  }
}

export async function deleteAlarmData(deletedAlarmUid) {
  try {
    await localDeleteAlarmData(deletedAlarmUid);
  } catch (error) {
    console.error('Fehler beim Löschen der Daten:', error);
    throw error;
  }
}