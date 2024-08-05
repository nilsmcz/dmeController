#include "led_control.h"

void clearStrip(Adafruit_NeoPixel& strip) {
  for(int i = 0; i < strip.numPixels(); i++) {
    strip.setPixelColor(i, 0);
  }
  strip.show();
}

void setStripColor(Adafruit_NeoPixel& strip, uint8_t r, uint8_t g, uint8_t b) {
  for(int i = 0; i < strip.numPixels(); i++) {
    strip.setPixelColor(i, strip.Color(g, r, b));
  }
  strip.show();
}
