#include "../lib/output.h"

LiquidCrystal_I2C lcd(0x21, 16, 2);

void manageWaterPump(bool status1, bool status2){
    digitalWrite(pump1, status1);
    digitalWrite(pump2, status2);
  }
  void controlFan(int fanSpeed)
{
  analogWrite(fan, fanSpeed);
}
Adafruit_NeoPixel NeoPixel(NUM_PIXELS, PIN_NEO_PIXEL, NEO_GRB + NEO_KHZ800);
void controlRGB(int a, int b, int c){
  for (int i = 0; i < NUM_PIXELS; i++)
  {
    NeoPixel.setPixelColor(i, NeoPixel.Color(a, b, c));
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