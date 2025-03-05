#ifndef INC_OUTPUT_H_
#define INC_OUTPUT_H_
#include "main.h"

extern LiquidCrystal_I2C lcd;
void manageWaterPump(bool status1, bool status2);
void controlFan(int fanSpeed);
void controlRGB(int a, int b, int c);
void lcdDisplay();
#endif /* INC_OUTPUT_H_ */