#include "Arduino.h"

#define GARAGE_1_PIN 8 //OBEN
#define GARAGE_2_PIN -1 //UNTEN
#define GARAGE_3_PIN -1 //LINKS
#define GARAGE_4_PIN -1 //RECHTS etc.
#define GARAGE_COUNT 4

// Definition der Struktur Timerange
const int startHour = 21;
const int startMinute = 30;
const int endHour = 5;
const int endMinute = 0;

int garagePins[] = {GARAGE_1_PIN, GARAGE_2_PIN, GARAGE_3_PIN, GARAGE_4_PIN};
bool garageOpenStatus[] = {false, false, false, false};

void initGarageControll(){
  for(int i = 0; i<GARAGE_COUNT; i++){
    if(garagePins[i] != -1){
      pinMode(garagePins[i], OUTPUT);
    }
  }
}

void checkIfInControlTime(Time alarmTime){
  const int hour = alarmTime.hour;
  const int minute = alarmTime.minute;

  if(endHour < startHour){
    if(hour > startHour || hour < endHour){
      return true; 
    }
  }

  if(endHour > startHour){
    if(hour > startHour && hour < endHour){
      return true;
    }
  }

  return false;
}

void openGarage(int garageNumber){
  if(garagePins[garageNumber] == -1){
    Serial.print("Es gibt keine Garage: ");
    Serial.print(garageNumber);
    return;
  }

  if(garageOpenStatus[garageNumber] == true){
    Serial.print("Die Garage ist bereits geöffnet.");
    return;
  }

  digitalWrite(garagePins[garageNumber], HIGH);
  delay(500);
  digitalWrite(garagePins[garageNumber], LOW);
  setGarageOpenStatus(garageNumber, true);
  Serial.print("Die Garage wurde geöffnet");

  return;
}

void closeGarage(int garageNumber){
  if(garagePins[garageNumber] == -1){
    Serial.print("Es gibt keine Garage: ");
    Serial.print(garageNumber);
    return;
  }

  if(garageOpenStatus[garageNumber] == false){
    Serial.print("Die Garage ist bereits geschlossen.");
    return;
  }

  digitalWrite(garagePins[garageNumber], HIGH);
  delay(500);
  digitalWrite(garagePins[garageNumber], LOW);
  setGarageOpenStatus(garageNumber, false);
  Serial.print("Die Garage wurde geschlossen");

  return;
}

void setGarageOpenStatus(int garageNumber, bool status){
  garageOpenStatus[garageNumber] = status;
  return;
}

void lernGarage(int garageNumber){
  Serial.println("Lernprozess wird begonnen...");
  delay(1000);
  Serial.println("Halten Sie die Taste auf dem alten Sender gedrückt");
  delay(1000);
  delay(3000);
  Serial.println("halten...");
  delay(3000);
  Serial.println("loslassen!");

  digitalWrite(garagePins[garageNumber], HIGH);
  delay(10000);
  digitalWrite(garagePins[garageNumber], LOW);

  Serial.println("Fernbedienung wurde angelernt!");
  Serial.println("Vorgang beendet!");
  return;
}