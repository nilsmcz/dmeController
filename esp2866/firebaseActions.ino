int getNextAlertValue(){
  String path = "/settings/nextAlertValue";
  int nextAlertValue = 0;

  if (Firebase.RTDB.getInt(&fbdo, path)) {

    if (fbdo.dataTypeEnum() == firebase_rtdb_data_type_integer) {
      nextAlertValue = fbdo.to<int>();
    }

  } else {
    nextAlertValue = 0;
  }

  return nextAlertValue;
}

void updateNextAlertValue(int newNextAlertValue){
  String path = "/settings/nextAlertValue";
  Firebase.RTDB.setInt(&fbdo, path, newNextAlertValue);
}

void uploadAlertData(JsonObject& data){
  Serial.println("uploadAlertData triggert!");
  int alertValue = getNextAlertValue();
  String alertValueString = String(alertValue);

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
  Firebase.RTDB.setString(&fbdo, "alerts/" + alertValueString + "/date", dateString);

  // Erstellen des Uhrzeit-Strings im Format "12:30:00"
  char timeString[9];
  snprintf(timeString, sizeof(timeString), "%02d:%02d:%02d", hour, minute, second);

  // Hochladen der Uhrzeit in die Firebase-Echtzeitdatenbank
  Firebase.RTDB.setString(&fbdo, "alerts/" + alertValueString + "/time", timeString);

  // Hochladen des Zeitstempels in die Firebase-Echtzeitdatenbank
  Firebase.RTDB.setInt(&fbdo, "alerts/" + alertValueString + "/timestamp", timestamp);

  Firebase.RTDB.setInt(&fbdo, "alerts/" + alertValueString + "/testAlarm", false);

  alertValue++;
  updateNextAlertValue(alertValue);
}