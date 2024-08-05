#include <ESP8266WiFi.h>
#include "wifi_config.h"

void setup() {
  Serial.begin(9600);

  // Beginne die WLAN-Verbindung
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.println();
  Serial.println();
  Serial.print("Verbinde mit ");
  Serial.println(WIFI_SSID);

  // Warte, bis die Verbindung hergestellt ist
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  // Wenn verbunden, gib die IP-Adresse aus
  Serial.println("");
  Serial.println("WiFi verbunden");
  Serial.println("IP-Adresse: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  Serial.println("Hello, World!");
  delay(1000);
}
