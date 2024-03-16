#include "Arduino.h"
#include "timeFunctions.h"
#include "communication.h"

const int relayContact = A0;
int relayContactValue = 0;

const int relayLampPin = 7;

const int alarmLed = 7;

// Array von Zeitpunkten für Probe-/Info-/Testalarme
Time testAlarmTimes[] = {
  {18, 0, 0, -1, -1, -1, 6},        // Freitag um 18:00 Uhr
  {12, 0, 0, -1, -1, -1, 7}        // Samstag um 12:00 Uhr
};
const int numAlarms = sizeof(testAlarmTimes) / sizeof(testAlarmTimes[0]);

void setup() {
  Serial.begin(4800);

  initCommunication();

  URTCLIB_WIRE.begin();

  pinMode(relayContact, INPUT);
  pinMode(alarmLed, OUTPUT);
  pinMode(relayLampPin, OUTPUT);
}

void loop() {
  relayContactValue = analogRead(relayContact);
  if(relayContactValue > 1000){
    const Time alarmTime = getCurrentTime();
    char alarmSubRic = getAlarmSubRic(alarmTime);
    Serial.println(alarmSubRic);
    if(alarmSubRic == 'a'){
      alarm(alarmTime);
    } else if(alarmSubRic == 'c'){
      testAlarm(alarmTime);
    }
  }
  delay(100);
}

char getAlarmSubRic(Time alarmTime){
  if(isTimeInTimelist(alarmTime, testAlarmTimes, numAlarms, 120)){
    return 'c';
  }
  return 'a';
}

void testAlarm(Time alarmTime){
  Serial.println("Probe-/Infoalarm");
  delay(1000 * 30);
  Serial.println("---reset---");
  Serial.println("");
  return;
}

void alarm(Time alarmTime){

  digitalWrite(7, HIGH);
  Serial.println("Einsatzalarm");

  // Erstelle ein JsonObject für die Daten
  DynamicJsonDocument dataBuffer(256); // Größe des JSON-Puffers anpassen, falls erforderlich
  JsonObject data = dataBuffer.to<JsonObject>();
  data["hour"] = alarmTime.hour;
  data["minute"] = alarmTime.minute;
  data["second"] = alarmTime.second;
  data["day"] = alarmTime.day;
  data["month"] = alarmTime.month;
  data["year"] = alarmTime.year;

  // Sende die Nachricht mit dem messageType 3 und den Daten
  sendJsonMessage(1, data);

  delay(1000 * 30);
  digitalWrite(7, LOW);
  Serial.println("---reset---");
  Serial.println("");
  return;
}