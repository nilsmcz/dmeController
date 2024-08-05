#include <Arduino.h>
#include "led_control.h"

#define LED_CONTROL_PIN 8
#define NUM_OF_LEDS 2

Adafruit_NeoPixel strip = Adafruit_NeoPixel(NUM_OF_LEDS, LED_CONTROL_PIN, NEO_RGB + NEO_KHZ800);

const int relayPin = 7;
bool alarmDetected = false;

void setup() {
  Serial.begin(115200);
  pinMode(relayPin, INPUT);
  strip.begin();
  strip.clear();
  strip.show(); // Ensure the initial clear is displayed
}

void loop() {
  int schalterZustand = digitalRead(relayPin);

  if(schalterZustand == HIGH) {
    if(alarmDetected == false) {
      Serial.println("Alarm erkannt");
      alarmDetected = true;
      setStripColor(strip, 240, 240, 240); // Set the strip to blue color when alarm is detected
    } else {
      Serial.println("Alarm aktiv");
      delay(1000);
    }
  }
  else if (schalterZustand == LOW) {
    if(alarmDetected == true) {
      Serial.println("Alarm beendet");
      alarmDetected = false;
      clearStrip(strip); // Clear the strip
    }
  }
  delay(100);
}
