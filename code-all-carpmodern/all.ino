#include <WiFi.h>
#include <PubSubClient.h>
#include <ESPmDNS.h>
#include <WiFiUdp.h>
#include <ArduinoOTA.h>
#include <WiFiManager.h>
#include "max6675.h"
#include <time.h>
#include <ESP32Servo.h>

//servo
Servo myservo_1; //ประกาศตัวแปรแทน Servo
Servo myservo_2;

TaskHandle_t Task1;
TaskHandle_t Task2;
TaskHandle_t Task3;
TaskHandle_t Task4;
TaskHandle_t Task5;
TaskHandle_t Task6;
TaskHandle_t Task7;

//infacolor
int analogPin = 18;
int color = 0;

//infaweight
int analogPin_2 = 2;
int weight = 0;

int thermoDO = 26;
int thermoCS = 27;
int thermoCLK = 14;
MAX6675 thermocouple(thermoCLK, thermoCS, thermoDO);

//timezone
char ntp_server1[20] = "pool.ntp.org";
char ntp_server2[20] = "time.nist.gov";
char ntp_server3[20] = "time.uni.net.th";

int timezone = 7 * 3600;
int dst = 0;

// เปลี่ยนเป็น SSID และ PASSWORD ของตัวเอง
//const char* ssid = "xxxxxx";
//const char* password = "xxxxxx";

void setup() {
  Serial.begin(115200);
  //servoGPIO
  myservo_1.attach(4);
  myservo_2.attach(33);

  //wifi
  WiFiManager wm;
  bool res;
  res = wm.autoConnect();
  if (!res) {
    Serial.println("Failed to connect");
  }
  else {
    Serial.println("connected...yeey :)");
  }

  // ส่วนของ OTA
//  ArduinoOTA
//  .onStart([]() {
//    String type;
//    if (ArduinoOTA.getCommand() == U_FLASH)
//      type = "sketch";
//    else          // แบบ U_SPIFFS
//      type = "filesystem";
//    Serial.println("Start updating " + type);
//  })
//  .onEnd([]() {
//    Serial.println("\nEnd");
//  })
//  .onProgress([](unsigned int progress, unsigned int total) {
//    Serial.printf("Progress: %u%%\r", (progress / (total / 100)));
//  })
//  .onError([](ota_error_t error) {
//    Serial.printf("Error[%u]: ", error);
//    if (error == OTA_AUTH_ERROR) Serial.println("Auth Failed");
//    else if (error == OTA_BEGIN_ERROR) Serial.println("Begin Failed");
//    else if (error == OTA_CONNECT_ERROR) Serial.println("Connect Failed");
//    else if (error == OTA_RECEIVE_ERROR) Serial.println("Receive Failed");
//    else if (error == OTA_END_ERROR) Serial.println("End Failed");
//  });
//
//  ArduinoOTA.begin();
//
//  Serial.println("Ready");
//  Serial.print("IP address: ");
//  Serial.println(WiFi.localIP());
//}
//
//
////configtimezone
//configTime(timezone, dst, ntp_server1, ntp_server2, ntp_server3);
//Serial.println("\nWaiting for time");
//while (!time(nullptr)) {
//  Serial.print(".");
//  delay(1000);
//}
//Serial.println("");


//create a task that will be executed in the Task1code() function, with priority 1 and executed on core 0
xTaskCreatePinnedToCore(
  Task1code,   /* Task function. */
  "Task1",     /* name of task. */
  10000,       /* Stack size of task */
  NULL,        /* parameter of the task */
  1,           /* priority of the task */
  &Task1,      /* Task handle to keep track of created task */
  1);          /* pin task to core 0 */
delay(500);

//create a task that will be executed in the Task2code() function, with priority 1 and executed on core 1
xTaskCreatePinnedToCore(
  Task2code,   /* Task function. */
  "Task2",     /* name of task. */
  10000,       /* Stack size of task */
  NULL,        /* parameter of the task */
  1,           /* priority of the task */
  &Task2,      /* Task handle to keep track of created task */
  1);          /* pin task to core 1 */
delay(500);

xTaskCreatePinnedToCore(
  Task3code,   /* Task function. */
  "Task3",     /* name of task. */
  10000,       /* Stack size of task */
  NULL,        /* parameter of the task */
  1,           /* priority of the task */
  &Task3,      /* Task handle to keep track of created task */
  1);          /* pin task to core 0 */
delay(500);


xTaskCreatePinnedToCore(
  Task4code,   /* Task function. */
  "Task4",     /* name of task. */
  10000,       /* Stack size of task */
  NULL,        /* parameter of the task */
  1,           /* priority of the task */
  &Task4,      /* Task handle to keep track of created task */
  1);          /* pin task to core 0 */
delay(500);


xTaskCreatePinnedToCore(
  Task5code,   /* Task function. */
  "Task5",     /* name of task. */
  10000,       /* Stack size of task */
  NULL,        /* parameter of the task */
  1,           /* priority of the task */
  &Task5,      /* Task handle to keep track of created task */
  1);          /* pin task to core 0 */
delay(500);

xTaskCreatePinnedToCore(
  Task6code,   /* Task function. */
  "Task6",     /* name of task. */
  10000,       /* Stack size of task */
  NULL,        /* parameter of the task */
  1,           /* priority of the task */
  &Task6,      /* Task handle to keep track of created task */
  0);          /* pin task to core 0 */
delay(500);
}


//Task6code: Time
void Task6code( void * pvParameters ) {
  Serial.print("Task6 running on core ");
  Serial.println(xPortGetCoreID());

  Serial.println(NowTime());
  delay(1000);
}
String NowTime() {

  time_t now = time(nullptr);
  struct tm* p_tm = localtime(&now);
  String timeNow = "";
  timeNow += String(p_tm->tm_hour);
  timeNow += ":";
  timeNow += String(p_tm->tm_min);
  timeNow += ":";
  timeNow += String(p_tm->tm_sec);
  timeNow += " ";
  timeNow += String(p_tm->tm_mday);
  timeNow += "-";
  timeNow += String(p_tm->tm_mon + 1);
  timeNow += "-";
  timeNow += String(p_tm->tm_year + 1900);

  if ((String (p_tm->tm_hour) == "9") && (String (p_tm->tm_min) == "1") && (String (p_tm->tm_sec) == "30"))
  {
    myservo_1.write(45);
    delay(500);
    myservo_1.write(0);
  }
  else if ((String (p_tm->tm_hour) == "8") && (String (p_tm->tm_min) == "1") && (String (p_tm->tm_sec) == "30"))
  {
    myservo_2.write(45);
    delay(500);
    myservo_2.write(0);
  }

  return timeNow;
}


//Task1code: Thermocouple
void Task1code( void * pvParameters ) {
  Serial.print("Task1 running on core ");
  Serial.println(xPortGetCoreID());
  ArduinoOTA.handle();

  Serial.print("C = ");
  Serial.println(thermocouple.readCelsius());
  Serial.print("F = ");
  Serial.println(thermocouple.readFahrenheit());

  // For the MAX6675 to update, you must delay AT LEAST 250ms between reads!
  delay(1000);
}



//Task2code: Infared color food
void Task2code( void * pvParameters ) {
  Serial.print("Task2 running on core ");
  Serial.println(xPortGetCoreID());

  color = analogRead(analogPin); //อ่านค่าสัญญาณ analog ขา A0
  Serial.print("colorfood = "); // พิมพ์ข้อความส่งเข้าคอมพิวเตอร์ "val = "
  Serial.println(color); // พิมพ์ค่าของตัวแปร val
  if (color > 500) {
    Serial.print("หมด");
  }

  delay(100);
}


//Task3code: Infared weight food
void Task3code( void * pvParameters ) {
  Serial.print("Task3 running on core ");
  Serial.println(xPortGetCoreID());

  weight = analogRead(analogPin_2); //อ่านค่าสัญญาณ analog ขา A0
  Serial.print("weightfood = "); // พิมพ์ข้อความส่งเข้าคอมพิวเตอร์ "val = "
  Serial.println(weight); // พิมพ์ค่าของตัวแปร val
  if (weight > 500) {
    Serial.print("หมด");
  }

  delay(100);
}


//Task4code: servoColr
void Task4code( void * pvParameters ) {
  Serial.print("Task4 running on core ");
  Serial.println(xPortGetCoreID());

}


//Task5code: servoWeight
void Task5code( void * pvParameters ) {
  Serial.print("Task5 running on core ");
  Serial.println(xPortGetCoreID());

  
}



void loop() {
  // ทำงาน ArduinoOTA ทุก Loop
  //ArduinoOTA.handle();
}
