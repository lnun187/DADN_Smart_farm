#ifndef INC_MAIN_H_
#define INC_MAIN_H_
#include <Arduino.h>
#include <DHT20.h>
#include <Wire.h>
#include <Adafruit_NeoPixel.h>
#include <AdafruitIO.h>
#include <Adafruit_MQTT.h>
#include "AdafruitIO_WiFi.h"
#include <LiquidCrystal_I2C.h>
#include "output.h"
#include "sensor.h"
// #include "adafruit.h"
#define pump1 19
#define pump2 23
#define soilMoisture 32
#define fan 27
#define light 33
#define PIN_NEO_PIXEL 26
#define NUM_PIXELS 4
#define WIFI_SSID "ACLAB"
#define WIFI_PASS "ACLAB2023"
#define IO_USERNAME  "YOUR-USERNAME"
#define IO_KEY       "YOUR-KEY"

#endif /* INC_MAIN_H_ */