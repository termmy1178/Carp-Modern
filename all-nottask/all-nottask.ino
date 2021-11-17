#include <WiFi.h>
#include <time.h>
#include "max6675.h"

const char* ssid = "Saithip_2.4G";             // SSID is set
const char* password = "0636632614";     // Password is set

char ntp_server1[20] = "pool.ntp.org";
char ntp_server2[20] = "time.nist.gov";
char ntp_server3[20] = "time.uni.net.th";

int timezone = 7 * 3600;
int dst = 0;

//------------------------
//infarcolor
const int e18Pin1 = 18;
int statusValcolor = 0;
//infarweight
const int e18Pin2 = 18;
int statusValweight = 0;
//------------------------
//Relay1
int Relay1 = 5;
//------------------------
//thermo
int thermoDO = 26;
int thermoCS = 27;
int thermoCLK = 14;
MAX6675 thermocouple(thermoCLK, thermoCS, thermoDO);
//------------------------

void setup() {
  Serial.begin(115200);
  pinMode(Relay1, OUTPUT);
  pinMode(e18Pin1, INPUT);
  pinMode(e18Pin2, INPUT);
  //---------------------------
  Serial.println("MAX6675 start");
  delay(1000);
  //---------------------------
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println(WiFi.localIP());
  Serial.println("");

  configTime(timezone, dst, ntp_server1, ntp_server2, ntp_server3);
  Serial.println("\nWaiting for time");
  while (!time(nullptr)) {
    Serial.print(".");
    delay(1000);
  }
  Serial.println("");

}

void loop() {
  digitalWrite(Relay1, LOW);
  delay(1000);
  //-----------------------------
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
  //-------------------------------------
  Serial.print("C = ");
  Serial.println(thermocouple.readCelsius());
  delay(1000);
  //-------------------------------------
  statusValcolor = digitalRead(e18Pin1);
  statusValweight = digitalRead(e18Pin2);

  if (statusValcolor == HIGH) {
    Serial.println("colorFood-out.");
  }
  if (statusValweight == HIGH) {
    Serial.println("weightFood-out.");
  }
  //-------------------------------------
  return timeNow;
}
