const int relayPin = 7;
bool alarmDetected = false;

void setup() {
  Serial.begin(115200);
  pinMode(relayPin, INPUT);
}

void loop() {
  int schalterZustand = digitalRead(relayPin);

  if(schalterZustand == HIGH) {
    if(alarmDetected == false) {
      Serial.println("Alarm erkannt");
      alarmDetected = true;
    } else {
      Serial.println("Alarm aktiv");
      delay(1000);
    }
  }
  else if (schalterZustand == LOW) {
    if(alarmDetected == true) {
      Serial.println("Alarm beendet");
      alarmDetected = false;
    }
  }
  
}
