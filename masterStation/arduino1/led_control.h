#ifndef LED_CONTROL_H
#define LED_CONTROL_H

#include <Adafruit_NeoPixel.h>

void clearStrip(Adafruit_NeoPixel& strip);
void setStripColor(Adafruit_NeoPixel& strip, uint8_t r, uint8_t g, uint8_t b);

#endif
