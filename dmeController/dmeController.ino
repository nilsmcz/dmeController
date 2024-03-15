#include "Arduino.h"
#include "uRTCLib.h"
#include "timeFunctions.h"
#include <SoftwareSerial.h>

SoftwareSerial s(5, 6); //(RX, TX)

const int relayContact = A0;
int relayContactValue = 0;

const int relayLampPin = 7;

const int alarmLed = 7;

// Array von Zeitpunkten für Probe-/Info-/Testalarme
Time testAlarmTimes[] = {
  {18, 0, 0, -1, -1, -1, 6},        // Freitag um 18:00 Uhr
  {12, 0, 0, -1, -1, -1, 7},        // Samstag um 12:00 Uhr
  {12, 31, 0, -1, -1, -1, -1}        // TEST
};
const int numAlarms = sizeof(testAlarmTimes) / sizeof(testAlarmTimes[0]);

void setup() {
  s.begin(9600);
  Serial.begin(4800);
  URTCLIB_WIRE.begin();
  pinMode(relayContact, INPUT);
  pinMode(alarmLed, OUTPUT);
  pinMode(relayLampPin, OUTPUT);
}

void loop() {
  relayContactValue = analogRead(relayContact);
  // Serial.println(relayContactValue);
  if(relayContactValue > 1000){
    alarm();
  }

  delay(100);
}

void alarm(){
  //Sub Rics: a=Einsatzalarm, b=Einsatz ohen Sonderrechte, c=Probe-/Infoalarm, d=Rückalarm
  char alarmSubRic;
  const Time alarmTime = getCurrentTime();

  if(isTimeInTimelist(alarmTime, testAlarmTimes, numAlarms, 120)){
    alarmSubRic = "c";
    Serial.println("Probe-/Infoalarm");
    delay(1000 * 30);
    Serial.println("---reset---");
    Serial.println("");
    return;
  }

  alarmSubRic = "a";
  digitalWrite(7, HIGH);
  Serial.println("Einsatzalarm");
  s.write("a");
  delay(1000 * 30);
  digitalWrite(7, LOW);
  Serial.println("---reset---");
  Serial.println("");
  return;
}