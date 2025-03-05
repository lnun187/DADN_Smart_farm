#include "../lib/main.h"
// #include "../lib/output.h"
// #include "../lib/sensor.h"
// Sử dụng Wire thay vì Wire1 (mặc định trên ESP32)

// int Value_Light;
// int Temperature;
// int Humidity;
// int soilMoisturePercentage;

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
}

void loop()
{
  readDHT20();
  readLight();
  readSoilMoisture();
  controlRGB(215, 15, 15);
  controlFan(100);
  lcdDisplay();
  delay(2000); // Đọc dữ liệu mỗi 2 giây để tránh xung đột I2C
}
