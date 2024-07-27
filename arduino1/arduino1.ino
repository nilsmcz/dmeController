const int relayContact = A0;
int relayContactValue = 0;

void setup() {
  Serial.begin(4800);
  pinMode(relayContact, INPUT);
}

void loop() {
  relayContactValue = analogRead(relayContact);
  if(relayContactValue > 1){
    Serial.println("SIGNAL");
  }
  delay(500);
}
