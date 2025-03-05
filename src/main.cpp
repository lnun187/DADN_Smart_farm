#include "../lib/main.h"
AdafruitIO_WiFi io(IO_USERNAME, IO_KEY, WIFI_SSID, WIFI_PASS);
AdafruitIO_Feed *led = io.feed("DADN_RGB_LED");
AdafruitIO_Feed *fan_control = io.feed("DADN_FAN");
AdafruitIO_Feed *humSensor = io.feed("DADN_DHT20");
AdafruitIO_Feed *tempSensor = io.feed("DADN_DHT20");
AdafruitIO_Feed *lightSensor = io.feed("DADN_LIGHT_SENSOR");
AdafruitIO_Feed *soilmoistureSensor = io.feed("DADN_SOIL_MOISTURE");
void handleRGB(AdafruitIO_Data *data){
  controlRGB(data->toString());
}
void handleFan(AdafruitIO_Data *data){
  controlFan(data->toInt());
}
void setup()
{
  pinMode(pump1, OUTPUT);
  pinMode(pump2, OUTPUT);
  pinMode(fan, OUTPUT);
  pinMode(soilMoisture, INPUT);
  pinMode(light, INPUT);
  Serial.begin(115200); // Tăng tốc độ baud để hiển thị nhanh hơn
  Wire.begin();         // Chỉ cần gọi Wire.begin() một lần
  DHT.begin();
  lcd.init(); // initialize the lcd
  lcd.backlight();
  io.connect();
  led->onMessage(handleRGB);
  fan_control->onMessage(handleFan);
  while(io.status() < AIO_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.println(io.statusText());
  led->get();
}

void loop()
{
  io.run();
  readLight();
  lightSensor->save(Value_Light);
  readDHT20();
  dht20Sensor->save(Value_Light);
  dht20Sensor->save(Value_Light);
  readSoilMoisture();
  soilmoistureSensor->save(Value_Light);
  // controlRGB("#00fff0");
  // controlFan(0);
  // lcdDisplay();
  
  delay(1000); // Đọc dữ liệu mỗi 2 giây để tránh xung đột I2C
}
