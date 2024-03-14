#include "Arduino.h"
#include "uRTCLib.h"

const int relayContact = A0;
int relayContactValue = 0;

const int alarmLed = 7;
unsigned long previousMillis = 0;
const long interval = 200; // Intervall für das Blinken der LED in Millisekunden

struct Time {
  int hour;
  int minute;
  int second;
  int day;
  int month;
  int year;
  int dayOfWeek;
};

void setup() {
  Serial.begin(9600);
  URTCLIB_WIRE.begin();
  pinMode(relayContact, INPUT);
  pinMode(alarmLed, OUTPUT);
}

void led(bool status){

  if(!status){
    digitalWrite(alarmLed, LOW);
    return;
  }

  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;
    digitalWrite(alarmLed, !digitalRead(alarmLed)); // Invertiere den Zustand der LED
  }
}

void loop() {
  relayContactValue = analogRead(relayContact);

  if(relayContactValue > 1000){
    Serial.println("ALARM");
    led(true);
  } else {
    led(false);
  }

  delay(100);
}
