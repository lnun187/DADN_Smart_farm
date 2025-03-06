#ifndef INC_OUTPUT_H_
#define INC_OUTPUT_H_
#include "main.h"

extern LiquidCrystal_I2C lcd;
void manageWaterPump1(bool status);
void manageWaterPump2(bool status);
void controlFan(int fanSpeed);
void controlRGB(String hex);
void lcdDisplay();
#endif /* INC_OUTPUT_H_ */