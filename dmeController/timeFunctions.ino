#include "Arduino.h"
#include "uRTCLib.h"

uRTCLib rtc(0x68);

char daysOfTheWeek[7][12] = {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"};

/**
 * Sets the date and time on the Real Time Clock (RTC) module.
 * @param second The second (0-59).
 * @param minute The minute (0-59).
 * @param hour The hour (0-23).
 * @param dayOfWeek The day of the week (1=Sunday, 2=Monday, ..., 7=Saturday).
 * @param dayOfMonth The day of the month (1-31).
 * @param month The month (1-12).
*/
void setTime(int second, int minute, int hour, int dayOfWeek, int dayOfMonth, int month, int year){
   rtc.set(second, minute, hour, dayOfWeek, dayOfMonth, month, year);
}

/**
 * Checks if the current time is within a specified time range around a constant time.
 * 
 * @param constantHour       The constant hour.
 * @param constantMinute     The constant minute.
 * @param constantSecond     The constant second.
 * @param timeRangeSeconds   The time range in seconds around the constant time.
 * 
 * @return True if the current time is within the specified time range around the constant time, otherwise false.
 */
bool isNearConstantTime(int constantHour, int constantMinute, int constantSecond, int timeRangeSeconds) {
  // Get current time from RTC module
  rtc.refresh();
  int currentHour = rtc.hour();
  int currentMinute = rtc.minute();
  int currentSecond = rtc.second();

  // Convert times to seconds
  int constantTotalSeconds = constantHour * 3600 + constantMinute * 60 + constantSecond;
  int currentTotalSeconds = currentHour * 3600 + currentMinute * 60 + currentSecond;

  // Check whether the current time is within the specified time range around constant time
  if (currentTotalSeconds >= constantTotalSeconds - timeRangeSeconds && 
      currentTotalSeconds <= constantTotalSeconds + timeRangeSeconds) {
    return true;
  } else {
    return false;
  }
}

/**
 * Checks if the current date matches a specified constant date.
 * 
 * @param constantDay   The constant day of the month (1-31).
 * @param constantMonth The constant month (1-12).
 * @param constantYear  The constant year.
 * 
 * @return True if the current date matches the specified constant date, otherwise false.
 */
bool isSameDate(int constantDay, int constantMonth, int constantYear) {
  // Retrieve current date from the RTC module
  rtc.refresh();
  int currentDay = rtc.day();
  int currentMonth = rtc.month();
  int currentYear = rtc.year();

  // Check if the current date matches the specified constant date
  if (currentDay == constantDay && currentMonth == constantMonth && currentYear == constantYear) {
    return true;
  } else {
    return false;
  }
}

void rtcTest(){
  rtc.refresh();

  // Serial.print("Current Date & Time: ");
  // Serial.print(rtc.year());
  // Serial.print('/');
  // Serial.print(rtc.month());
  // Serial.print('/');
  // Serial.print(rtc.day());

  // Serial.print(" (");
  // Serial.print(daysOfTheWeek[rtc.dayOfWeek()-1]);
  // Serial.print(") ");

  Serial.print(rtc.hour());
  Serial.print(':');
  Serial.print(rtc.minute());
  Serial.print(':');
  Serial.println(rtc.second());

  // Serial.print("Temperature: ");
  // Serial.print(rtc.temp()  / 100);
  // Serial.print("\xC2\xB0");   //shows degrees character
  // Serial.println("C");

  delay(500);  
}
