#include <WiFi.h>
#include <PubSubClient.h>
#include "HX711.h"
// Update these with values suitable for your network.
const char* ssid = "termtpp";
const char* password = "12345678";
const char* mqtt_server = "203.154.91.133";
#include "DHT.h"
#define DHTPIN 5
//#define DHTTYPE DHT11   // DHT 11
#define DHTTYPE DHT22   // DHT 22  (AM2302), AM2321
//#define DHTTYPE DHT21   // DHT 21 (AM2301)

#define calibration_factor -380000 // เอาค่าที่ได้จากการปรับ มาใส่ตรงนี้
//loadcell
const int DOUT = 27;
const int CLK  = 26;
//infa
const int e18Pin1 = 18;
const int e18Pin2 = 19;
int statusVal1 = 0;
int statusVal2 = 0;

DHT dht(DHTPIN, DHTTYPE);
HX711 scale;


int BUILTIN_LED = 16;

WiFiClient espClient;
PubSubClient client(espClient);
unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE  (50)
char msg[MSG_BUFFER_SIZE];
int value = 0;

void setup_wifi() {

  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();

  // Switch on the LED if an 1 was received as first character
  if ((char)payload[0] == '1') {
    digitalWrite(BUILTIN_LED, LOW);   // Turn the LED on (Note that LOW is the voltage level
    // but actually the LED is on; this is because
    // it is active low on the ESP-01)
  } else {
    digitalWrite(BUILTIN_LED, HIGH);  // Turn the LED off by making the voltage HIGH
  }

}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "ESP32Client-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      client.publish("outTopic", "hello world");
      // ... and resubscribe
      client.subscribe("inTopic");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup() {
  scale.begin(DOUT, CLK);
  Serial.begin(115200);
  pinMode(BUILTIN_LED, OUTPUT);  
  pinMode(e18Pin1, INPUT);
  pinMode(e18Pin2, INPUT);
  
  
  dht.begin();
  delay(500);
  
  
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);

    
  Serial.println("ArduinoAll Calibrating...");
  scale.set_scale(calibration_factor); // ปรับค่า calibration factor
  scale.tare(); //รีเซตน้ำหนักเป็น 0
  Serial.println("OK Start :");
  
}

void loop() {
  int statustemp = dht.readTemperature();
  ///loadcell
  Serial.print("Reading: ");
  Serial.print(scale.get_units(), 2); //แสดงผลน้ำหนัก 2 ตำแหน่ง
  Serial.println("g");
  
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  unsigned long now = millis();
  if (now - lastMsg > 2000) {
    lastMsg = now;
    ++value;
    snprintf (msg, MSG_BUFFER_SIZE, "%ld", statustemp);
//    Serial.print("Publish message: ");
    Serial.println(msg);
    client.publish("/datatemp", msg);
  }
  
  statusVal1 = digitalRead(e18Pin1);
  if (statusVal1 == HIGH) {
    Serial.println("﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏ ");
    Serial.println("▶ Color-Food: Nostock.");
    delay(1000);
  } else {
    Serial.println("﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏ ");
    Serial.println("▶ Color-Food: stock.");
    
    delay(1000);
  }
  
  statusVal2 = digitalRead(e18Pin2);
  if (statusVal2 == HIGH) {
    
    Serial.println("▶ weight-Food: Nostock.");
    
    delay(1000);
  } else {
    
    Serial.println("▶ weight-Food: stock.");
    
    delay(1000);

  }
  
  if (isnan(statustemp) )
  {
    Serial.println(F("Failed to read from DHT sensor!"));
    //return;
  }
  
  Serial.print(F("▶ Temperature: "));
  Serial.print(statustemp);
  Serial.println(F("°C "));
 
  
  ////////////////////////
  delay(1000);
  
  
}
