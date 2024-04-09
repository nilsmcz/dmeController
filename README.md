# Projektbeschreibung
Dieses Projekt kombiniert einen Arduino Uno und einen ESP8266, um eine intelligente Steuerung für Garage und Beleuchtung zu realisieren. Es reagiert auf Relais-Signale von der Swisspone DME-Ladestation, um Aktionen wie das Öffnen der Garage und die Beleuchtungssteuerung auszulösen.

Die kontinuierliche Verbindung zur Firebase-Datenbank gewährleistet eine zuverlässige Datenverwaltung. Benutzer können verschiedene Einstellungen vornehmen, einschließlich Probealarmzeiträumen und Zeitplänen für die automatische Öffnung und Schließung der Garage.

Durch das Web-UI haben Benutzer von überall aus vollständige Kontrolle über das System, einschließlich manueller Garagesteuerung. Alle Einsatzmeldungen werden protokolliert, um eine einfache Nachverfolgung und Analyse zu ermöglichen.

## Funktionen
* Reagiert auf Relais-Signal von Swisspone DME-Ladestation
* Steuerung von Garage und Beleuchtung
* Ständige Verbindung mit Firebase-Datenbank
* Konfigurierbare Einstellungen wie Probealarmzeiträume und Öffnungs-/Schließzeiten der Garage
* Web-UI für Fernzugriff und vollständige Kontrolle
* Protokollierung aller Einsatzmeldungen

## Installation und Verwendung
* Klonen Sie das Repository auf Ihren lokalen Computer.
* Konfigurieren Sie die erforderlichen Bibliotheken für Arduino Uno und ESP8266.
* Passen Sie die Firebase-Konfiguration an, um eine Verbindung zur Datenbank herzustellen.
* Laden Sie den Code auf Ihren Arduino Uno und ESP8266 hoch.
* Richten Sie das Web-UI ein, um auf das System zuzugreifen und Einstellungen vorzunehmen.

## Firebase Security Rules
### Realtime Database

The following security rules ensure that only authenticated users can read from and write to the Realtime Database:

```json
{
  "rules": {
    ".read": "auth != null", 
    ".write": "auth != null"
  }
}
```

### Firestore Database

The following security rules ensure that only authenticated users can read from and write to the Firesore Database:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Only authenticated users are allowed to read, write, or update
    match /{document=**} {
      allow read, write, update: if request.auth != null;
    }
  }
}
```
