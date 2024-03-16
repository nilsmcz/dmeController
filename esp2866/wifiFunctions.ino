void connectWifi(String ssid, String password){

  WiFi.begin(ssid, password);
  Serial.print("Connecting to Wi-Fi");
  unsigned long ms = millis();

  while (WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(500);
  }

  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();
}
