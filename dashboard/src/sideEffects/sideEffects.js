import { localGetHistoryAlarms, localGetTestAlarms } from '../firebase/localFunctions';

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