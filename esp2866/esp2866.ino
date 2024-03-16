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

#include <ArduinoJson.h>

void uploadAlertData(JsonObject& data){
  int hour = data["hour"];
  int minute = data["minute"];
  int second = data["second"];
  int day = data["day"];
  int month = data["month"];
  int year = data["year"];
  year += 2000;

  // Erstellen eines Zeit-Objekts
  tmElements_t tm;
  tm.Hour = hour;
  tm.Minute = minute;
  tm.Second = second;
  tm.Day = day;
  tm.Month = month;
  tm.Year = year - 1970; // Jahr seit 1970

  // Berechnen des Unix-Zeitstempels
  time_t timestamp = makeTime(tm);

  // Erstellen des Datum-Strings im Format "14.03.2024"
  char dateString[11];
  snprintf(dateString, sizeof(dateString), "%02d.%02d.%04d", day, month, year);

  // Hochladen des Datums in die Firebase-Echtzeitdatenbank
  Firebase.RTDB.setString(&fbdo, "alerts/1/date", dateString);

  // Erstellen des Uhrzeit-Strings im Format "12:30:00"
  char timeString[9];
  snprintf(timeString, sizeof(timeString), "%02d:%02d:%02d", hour, minute, second);

  // Hochladen der Uhrzeit in die Firebase-Echtzeitdatenbank
  Firebase.RTDB.setString(&fbdo, "alerts/1/time", timeString);

  // Hochladen des Zeitstempels in die Firebase-Echtzeitdatenbank
  Firebase.RTDB.setInt(&fbdo, "alerts/1/timestamp", timestamp);

  Firebase.RTDB.setInt(&fbdo, "alerts/1/testAlarm", false);
}
