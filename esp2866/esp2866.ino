#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <Firebase_ESP_Client.h>
#include <addons/TokenHelper.h>
#include <addons/RTDBHelper.h>
#include "Secrets.h"
#include <SoftwareSerial.h>
#include <ArduinoJson.h>
#include <TimeLib.h>

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

unsigned long dataMillis = 0;
int count = 0;

void setup() {
  Serial.begin(115200);

  initCommunication();

  connectWifi(WIFI_SSID, WIFI_PASSWORD);

  printFirebaseClientVersion();
  connectFirebaseWithEmail(API_KEY, DATABASE_URL, FIREBASE_USER_EMAIL, FIREBASE_USER_PASSWORD);
}

void loop() {
  receiveMessage();
  String path = "/UsersData/" + getUserUid() + "/counter";
  long counterValue = 100;

  receiveMessage();
  delay(70);
}


