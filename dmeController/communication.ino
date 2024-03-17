#include "communication.h"

SoftwareSerial com(RX_PIN, TX_PIN);  

void initCommunication() {
  com.begin(BAUD);
}

String lastMessageStorage = "";
int resendCounter = 0;




void sendJsonMessage(int messageType, JsonObject& jsonData) {
  DynamicJsonDocument jsonBuffer(256);
  jsonBuffer["messageType"] = messageType;
  jsonBuffer["messageId"] = random(0, 99999);
  jsonBuffer["data"] = jsonData;

  String jsonString;
  serializeJson(jsonBuffer, jsonString);

  com.println(jsonString);
  lastMessageStorage = jsonString;
  resendCounter = 0;
  Serial.print("Message sent: ");
  Serial.println(jsonString);
}

void sendErrorCode(String errorCode){
  com.println(errorCode);
  Serial.print("ErrorCode sent: ");
  Serial.println(errorCode);
}

void resendLastMessageStorage(){
  if(lastMessageStorage == ""){
    Serial.println("No last message!");
    return;
  }
  if(resendCounter>5){
    Serial.println("Max resend count!");
    return;
  }

  Serial.print("lastMessageStorage sent: ");
  Serial.println(lastMessageStorage);
  com.print(lastMessageStorage);
  resendCounter++;
}

int checkForErrorCode(String message) {
  int errorCode = message.toInt();

  if(errorCode == 422){
    return 422;
  }
  else if(errorCode == 400){
    return 400;
  }

  return 0;
}

void processErrorCode(int errorCode) {
  Serial.print("ErrorCode received: ");
  Serial.println(errorCode);

  if(errorCode == 422){
    resendLastMessageStorage();
  }
}

void receiveMessage() {
  if (com.available() > 0) {
    String message = com.readStringUntil('\n');

    int errorCode = checkForErrorCode(message);

    if (errorCode != 0) {
      processErrorCode(errorCode);
      return;
    }

    processMessage(message);
  }
}

void processMessage(String jsonString) {
  Serial.print("Message received: ");
  Serial.println(jsonString);

  StaticJsonDocument<256> jsonBuffer;
  DeserializationError error = deserializeJson(jsonBuffer, jsonString);

  if (error) {
    Serial.print("Fehler beim Parsen des JSON: ");
    Serial.println(error.c_str());
    sendErrorCode("422");
    return;
  }

  int messageType = jsonBuffer["messageType"];
  int messageId = jsonBuffer["messageId"];
  Serial.print("Message type: ");
  Serial.println(messageType);

  JsonObject data = jsonBuffer["data"];

  switch (messageType) {
    case 1:
      {
        // uploadAlertData(data);
        break;
      }
    default:
      {
        // handleUnknownMessageType(messageType, data);
        break;
      }
  }
}