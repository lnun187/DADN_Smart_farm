#include "../lib/output.h"

LiquidCrystal_I2C lcd(0x21, 16, 2);

void manageWaterPump1(bool status)
{
  digitalWrite(pump1, status);
}
void manageWaterPump2(bool status)
{
  digitalWrite(pump2, status);
}
void controlFan(int fanSpeed)
{
  analogWrite(fan, fanSpeed);
}
Adafruit_NeoPixel NeoPixel(NUM_PIXELS, PIN_NEO_PIXEL, NEO_GRB + NEO_KHZ800);
uint32_t hexToUint32(String hex)
{
  if (hex.charAt(0) == '#')
  {
    hex = hex.substring(1); // Bỏ ký tự '#'
  }
  long number = strtol(hex.c_str(), NULL, 16); // Chuyển đổi chuỗi hex thành số
  uint8_t r = (number >> 16) & 0xFF;           // Lấy giá trị Red
  uint8_t g = (number >> 8) & 0xFF;            // Lấy giá trị Green
  uint8_t b = number & 0xFF;                   // Lấy giá trị Blue
  return NeoPixel.Color(r, g, b);
}
void controlRGB(String hex)
{
  for (int i = 0; i < NUM_PIXELS; i++)
  {
    NeoPixel.setPixelColor(i, hexToUint32(hex));
    NeoPixel.show();
  }
}
void lcdDisplay()
{
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("T:");
  lcd.print(Temperature, 1);
  lcd.print("^C");

  lcd.print(" L:");
  lcd.print(Value_Light);

  lcd.setCursor(0, 1);
  lcd.print("H:");
  lcd.print(Humidity, 1);
  lcd.print("%");

  lcd.print("  S:");
  lcd.print(soilMoisturePercentage);
  lcd.print("%");
}