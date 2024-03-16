#include <SoftwareSerial.h>
#include <ArduinoJson.h>

#define COMPONENT_NAME "arduinoUno1"
#define RX_PIN 5
#define TX_PIN 6
#define BAUD 9600

extern SoftwareSerial com;
void sendJsonMessage(int messageType, JsonObject& jsonData);