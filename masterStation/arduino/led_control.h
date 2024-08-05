#ifndef LED_CONTROL_H
#define LED_CONTROL_H

#include <Adafruit_NeoPixel.h>

/**
 * @brief Setzt alle LEDs im Strip auf aus.
 * 
 * Diese Funktion setzt alle LEDs im angegebenen Adafruit_NeoPixel-Strip
 * auf aus (Farbe 0,0,0) und zeigt die Änderung an.
 * 
 * @param strip Referenz auf einen Adafruit_NeoPixel-Strip.
 */
void clearStrip(Adafruit_NeoPixel& strip);

/**
 * @brief Setzt alle LEDs im Strip auf die angegebene Farbe.
 * 
 * Diese Funktion setzt alle LEDs im angegebenen Adafruit_NeoPixel-Strip
 * auf die angegebene RGB-Farbe und zeigt die Änderung an.
 * 
 * @param strip Referenz auf einen Adafruit_NeoPixel-Strip.
 * @param r Rot-Wert der Farbe (0-255).
 * @param g Grün-Wert der Farbe (0-255).
 * @param b Blau-Wert der Farbe (0-255).
 */
void setStripColor(Adafruit_NeoPixel& strip, uint8_t r, uint8_t g, uint8_t b);

#endif
