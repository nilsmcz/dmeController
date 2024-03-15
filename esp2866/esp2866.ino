#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <Firebase_ESP_Client.h>
#include <addons/TokenHelper.h>
#include <addons/RTDBHelper.h>
#include "Secrets.h"
#include "firebaseFunctions.h"
#include "wifiFunctions.h"

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

unsigned long dataMillis = 0;
int count = 0;

void setup(){
    Serial.begin(115200);

    connectWifi(WIFI_SSID, WIFI_PASSWORD);

    printFirebaseClientVersion();
    connectFirebaseWithEmail(API_KEY, DATABASE_URL, FIREBASE_USER_EMAIL, FIREBASE_USER_PASSWORD);
}

void loop(){
  String path = "/UsersData/" + getUserUid() + "/counter";
  int counterValue;

  if (Firebase.RTDB.getInt(&fbdo, path)) {

    if (fbdo.dataTypeEnum() == firebase_rtdb_data_type_integer) {
      counterValue = fbdo.to<int>();
      counterValue++;
      Firebase.RTDB.setInt(&fbdo, path, counterValue);
    }

  } else {
    Serial.println(fbdo.errorReason());
    Serial.println("No last counter value!");
    Firebase.RTDB.setInt(&fbdo, path, 0);
  }
  
  delay(1000);
}
