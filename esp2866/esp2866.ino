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

void loop()
{
        dataMillis = millis();
        String path = "/UsersData/";
        path += getUserUid();
        path += "/test/int";
        Serial.printf("Set int... %s\n", Firebase.RTDB.setInt(&fbdo, path, count++) ? "ok" : fbdo.errorReason().c_str());
        delay(1000);
}
