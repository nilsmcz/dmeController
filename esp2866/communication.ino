#include "communication.h"

SoftwareSerial com(RX_PIN, TX_PIN);  

void initCommunication() {
  com.begin(BAUD);
}