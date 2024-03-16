#include "communication.h"
#include "firebaseFunctions.h"
#include <ArduinoJson.h>

SoftwareSerial com(RX_PIN, TX_PIN);  

void initCommunication() {
  com.begin(BAUD);
}

void receiveMessage() {
  if (com.available() > 0) {

    String jsonString = com.readStringUntil('\n');
    Serial.println(jsonString);

    StaticJsonDocument<256> jsonBuffer;
    DeserializationError error = deserializeJson(jsonBuffer, jsonString);

    if (error) {
      Serial.print("Fehler beim Parsen des JSON: ");
      Serial.println(error.c_str());
      return;
    }

    int messageType = jsonBuffer["messageType"];
    int messageId = jsonBuffer["messageId"];

    JsonObject data = jsonBuffer["data"];
    
    switch(messageType) {
      case 1: {
        uploadAlertData(data);
        break;
      }
      default: {
        // handleUnknownMessageType(messageType, data);
        break;
      }
    }
  }
}