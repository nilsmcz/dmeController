#include "Arduino.h"
#include "uRTCLib.h"

const int relayContact = A0;
int relayContactValue = 0;

const int alarmLed = 7;
unsigned long previousMillis = 0;
const long interval = 200; // Intervall für das Blinken der LED in Millisekunden

void setup() {
  Serial.begin(9600);
  URTCLIB_WIRE.begin();
  pinMode(relayContact, INPUT);
  pinMode(alarmLed, OUTPUT);
}

void loop() {
  relayContactValue = analogRead(relayContact);

  if(relayContactValue > 1000){
    Serial.println("ALARM");
    unsigned long currentMillis = millis();
    if (currentMillis - previousMillis >= interval) {
      // Zeit für das Blinken der LED abgelaufen, umschalten
      previousMillis = currentMillis;
      digitalWrite(alarmLed, !digitalRead(alarmLed)); // Invertiere den Zustand der LED
    }
  } else {
    digitalWrite(alarmLed, LOW);
  }
  rtcTest();
  // Andere Aufgaben können hier ausgeführt werden, ohne das Blinken der LED zu blockieren
}
