#include "led_control.h"

void clearStrip(Adafruit_NeoPixel& strip) {
  for(int i = 0; i < strip.numPixels(); i++) {
    strip.setPixelColor(i, 0); // Turn off all LEDs
  }
  strip.show(); // Update the strip to turn off all LEDs
}

void setStripColor(Adafruit_NeoPixel& strip, uint8_t r, uint8_t g, uint8_t b) {
  for(int i = 0; i < strip.numPixels(); i++) {
    strip.setPixelColor(i, strip.Color(g, r, b)); // Set all LEDs to the given color
  }
  strip.show(); // Update the strip to show the new color
}
