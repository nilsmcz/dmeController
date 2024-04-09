# Project Description
This project combines an Arduino Uno and an ESP8266 to realize an intelligent control system for garage and lighting. It responds to relay signals from the Swisspone DME charging station to trigger actions such as opening the garage and controlling the lighting.

Continuous connection to the Firebase database ensures reliable data management. Users can configure various settings, including trial alarm periods and schedules for automatic garage opening and closing.

Through the web UI, users have complete control over the system from anywhere, including manual garage control. All deployment reports are logged for easy tracking and analysis.

## Features
* Responds to relay signal from Swisspone DME charging station
* Control of garage and lighting
* Continuous connection with Firebase database
* Configurable settings such as trial alarm periods and garage opening/closing times
* Web UI for remote access and full control
* Logging of all deployment reports

## Installation and Usage
* Clone the repository to your local computer.
* Configure the necessary libraries for Arduino Uno and ESP8266.
* Customize the Firebase configuration to connect to the database.
* Upload the code to your Arduino Uno and ESP8266.
* Set up the web UI to access the system and configure settings.

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
