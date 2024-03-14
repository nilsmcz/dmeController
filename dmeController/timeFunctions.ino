#include "Arduino.h"
#include "uRTCLib.h"
#include "timeFunctions.h"

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
void setRtcModuleTime(int second, int minute, int hour, int dayOfWeek, int dayOfMonth, int month, int year){
   rtc.set(second, minute, hour, dayOfWeek, dayOfMonth, month, year);
}

/**
 * Retrieves the current time from the Real Time Clock (RTC) module.
 * 
 * This function refreshes the RTC module to ensure it provides the most up-to-date time,
 * then retrieves the current hour, minute, second, day, month, and year from the module.
 * 
 * @return A Time structure representing the current time, including hour, minute, second,
 *         day of the month, month, and year.
 */
Time getCurrentTime() {
  rtc.refresh();

  Time currentTime = {
    rtc.hour(),
    rtc.minute(),
    rtc.second(),
    rtc.day(),
    rtc.month(),
    rtc.year(),
    rtc.dayOfWeek(),
  };

  return currentTime;
}

/**
 * Checks if the given time is within a specified range around a reference time.
 * 
 * @param time The given time.
 * @param reference The reference time.
 * @param timeRangeSeconds The time range in seconds around the reference time.
 * 
 * @return True if the given time is within the specified time range around the reference time, otherwise false.
 */
bool isTimeWithinRange(Time time, Time reference, int timeRangeSeconds) {

  if(time.year >= 0 && reference.year >= 0){
    if(time.year != reference.year){
      // Serial.println("Wrong year");
      return false;
    }
  }

  if(time.month >= 0 && reference.month >= 0){
    if(time.month != reference.month){
      // Serial.println("Wrong month");
      return false;
    }
  }

  if(time.day >= 0 && reference.day >= 0){
    if(time.day != reference.day){
      // Serial.println("Wrong day");
      return false;
    }
  }

  if(time.dayOfWeek >= 0 && reference.dayOfWeek >= 0){
    if(time.dayOfWeek != reference.dayOfWeek){
      // Serial.println("Wrong dayOfWeek");
      return false;
    }
  }

  // // Convert the given time and reference time to seconds
  unsigned long timeTotalSeconds = time.hour * 3600 + time.minute * 60 + time.second;
  unsigned long referenceTotalSeconds = reference.hour * 3600 + reference.minute * 60 + reference.second;

  if (timeTotalSeconds >= referenceTotalSeconds - timeRangeSeconds && timeTotalSeconds <= referenceTotalSeconds + timeRangeSeconds) {
    return true;
  } else {
    return false;
  }
}

/**
 * Checks if the given time falls within the time range of any time point in the list.
 * 
 * @param time The time to be checked.
 * @param timelist The array containing time points to compare against.
 * @param numElements The number of elements in the timelist array.
 * @param timeRangeSeconds The time range in seconds to consider (optional).
 *                         Defaults to 0 if not provided.
 * 
 * @return True if the given time falls within the time range of any time point in the list, otherwise false.
 */
bool isTimeInTimelist(Time time, Time timelist[], int numElements, int timeRangeSeconds = 0) {

  for (int i = 0; i < numElements; ++i) {
    if(isTimeWithinRange(time, timelist[i], timeRangeSeconds)){
      return true;
    }
  }

  return false;
}