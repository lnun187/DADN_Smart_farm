#ifndef INC_SENSOR_H_
#define INC_SENSOR_H_
#include "main.h"
extern int Value_Light;
extern int Temperature;
extern int Humidity;
extern int soilMoisturePercentage;
extern DHT20 DHT;
void readDHT20();
void readSoilMoisture();
void readLight();
#endif /* INC_SENSOR_H_ */