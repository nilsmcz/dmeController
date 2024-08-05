#include <Adafruit_NeoPixel.h>
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
      setStripColor(240, 240, 240); // Set the strip to blue color when alarm is detected
    } else {
      Serial.println("Alarm aktiv");
      delay(1000);
    }
  }
  else if (schalterZustand == LOW) {
    if(alarmDetected == true) {
      Serial.println("Alarm beendet");
      alarmDetected = false;
      clearStrip(); // Clear the strip
    }
  }
  delay(100);
}

void clearStrip() {
  for(int i = 0; i < NUM_OF_LEDS; i++) {
    strip.setPixelColor(i, 0); // Turn off all LEDs
  }
  strip.show(); // Update the strip to turn off all LEDs
}

void setStripColor(uint8_t r, uint8_t g, uint8_t b) {
  for(int i = 0; i < NUM_OF_LEDS; i++) {
    strip.setPixelColor(i, strip.Color(g, r, b)); // Set all LEDs to the given color
  }
  strip.show(); // Update the strip to show the new color
}
