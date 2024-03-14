#ifndef TIME_FUNCTIONS_H
#define TIME_FUNCTIONS_H

#include "Arduino.h"
#include "uRTCLib.h"

// Definition der Struktur Time
struct Time {
  int hour;
  int minute;
  int second;
  int day;
  int month;
  int year;
  int dayOfWeek;
};

// Definition der Funktionen
void setRtcModuleTime(int second, int minute, int hour, int dayOfWeek, int dayOfMonth, int month, int year);
Time getCurrentTime();
bool isTimeWithinRange(Time time, Time reference, int timeRangeSeconds);
bool isTimeInTimelist(Time time, Time timelist[], int numElements, int timeRangeSeconds = 0);

#endif
