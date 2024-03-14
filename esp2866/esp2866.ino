
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>
#include <addons/TokenHelper.h>
#include <addons/RTDBHelper.h>
#include "Secrets.h"

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

unsigned long dataMillis = 0;
int count = 0;
bool signupOK = false;


void setup()
{

    Serial.begin(115200);
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("Connecting to Wi-Fi");

    unsigned long ms = millis();
    while (WiFi.status() != WL_CONNECTED)
    {
        Serial.print(".");
        delay(300);
    }

    Serial.println();
    Serial.print("Connected with IP: ");
    Serial.println(WiFi.localIP());
    Serial.println();

    Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);


    config.api_key = API_KEY;
    config.database_url = DATABASE_URL;
    Firebase.reconnectNetwork(true);
    fbdo.setBSSLBufferSize(4096, 1024 );
    fbdo.setResponseSize(4096);

    String base_path = "/UsersData/";

    auth.user.email = FIREBASE_USER_EMAIL;
    auth.user.password = FIREBASE_USER_PASSWORD;
    config.token_status_callback = tokenStatusCallback;
    Firebase.begin(&config, &auth);
    Serial.print("SETUP DONE");
}

void loop()
{
    Serial.print("loop1");
    dataMillis = millis();
    String path = auth.token.uid.c_str(); //<- user uid
    path += "/test/int";
    Serial.printf("Set int... %s\n", Firebase.setInt(fbdo, path, count++) ? "ok" : fbdo.errorReason().c_str());
    delay(1000);
}