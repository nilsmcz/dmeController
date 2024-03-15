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
