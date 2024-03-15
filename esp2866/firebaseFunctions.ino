#include <Arduino.h>
#include <Firebase_ESP_Client.h>
#include <addons/TokenHelper.h>
#include <addons/RTDBHelper.h>
#include "firebaseFunctions.h"

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

void connectFirebaseWithEmail(String apiKey, String databaseUrl, String userEmail, String userPassword){
  config.api_key = apiKey;
  config.database_url = databaseUrl;

  Firebase.reconnectNetwork(true);
  fbdo.setBSSLBufferSize(4096, 1024 );
  fbdo.setResponseSize(4096);

  auth.user.email = userEmail;
  auth.user.password = userPassword;
  config.token_status_callback = tokenStatusCallback;
  Firebase.begin(&config, &auth);
}

void printFirebaseClientVersion() {
  Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);
}

String getUserUid(){
  return auth.token.uid.c_str();
}