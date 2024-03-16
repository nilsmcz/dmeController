#include <SoftwareSerial.h>

#define RX_PIN 12 // D6 maps to GPIO 12
#define TX_PIN 14 // D5 maps to GPIO 14
#define BAUD 9600

extern SoftwareSerial com;

void receiveMessage();