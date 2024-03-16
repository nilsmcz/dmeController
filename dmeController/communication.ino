#include "communication.h"

SoftwareSerial com(RX_PIN, TX_PIN);  

void initCommunication() {
  com.begin(BAUD);
}

void sendJsonMessage(int messageType, JsonObject& jsonData) {
  DynamicJsonDocument jsonBuffer(256);
  jsonBuffer["messageType"] = messageType;
  jsonBuffer["messageId"] = random(0, 99999);
  jsonBuffer["data"] = jsonData;

  String jsonString;
  serializeJson(jsonBuffer, jsonString);

  Serial.println(jsonString);
  com.println(jsonString);
}