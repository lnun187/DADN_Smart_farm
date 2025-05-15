#include "../lib/main.h"
#define ID 0 // ID = 0 là thiết bị chính, ID = 1 là thiết bị phụ
AdafruitIO_WiFi io(IO_USERNAME, IO_KEY, WIFI_SSID, WIFI_PASS);
#if ID == 0
    AdafruitIO_Feed *led = io.feed("DADN_RGB_LED");
    AdafruitIO_Feed *fan_control = io.feed("DADN_FAN");
    AdafruitIO_Feed *humSensor = io.feed("DADN_DHT20_HUM");
    AdafruitIO_Feed *tempSensor = io.feed("DADN_DHT20_TEMP");
    AdafruitIO_Feed *lightSensor = io.feed("DADN_LIGHT_SENSOR");
    AdafruitIO_Feed *soilmoistureSensor = io.feed("DADN_SOIL_MOISTURE");
    AdafruitIO_Feed *pump1_control = io.feed("DADN_PUMP1");
    AdafruitIO_Feed *pump2_control = io.feed("DADN_PUMP2");

#else
    AdafruitIO_Feed *humSensor = io.feed("DADN_DHT20_HUM_1");
    AdafruitIO_Feed *tempSensor = io.feed("DADN_DHT20_TEMP_1");
    AdafruitIO_Feed *lightSensor = io.feed("DADN_LIGHT_SENSOR_1");
    AdafruitIO_Feed *soilmoistureSensor = io.feed("DADN_SOIL_MOISTURE_1");
    AdafruitIO_Feed *led = io.feed("DADN_RGB_LED_1");
    AdafruitIO_Feed *pump1_control = io.feed("DADN_PUMP1_1");   
    AdafruitIO_Feed *pump2_control = io.feed("DADN_PUMP2_1");
    AdafruitIO_Feed *fan_control = io.feed("DADN_FAN_1");

#endif
// Cấu hình Timer
hw_timer_t *timer = NULL;
portMUX_TYPE timerMux = portMUX_INITIALIZER_UNLOCKED;
volatile bool flag = false; // Biến cờ báo hiệu ngắt xảy ra

// Ngắt Timer ISR
void IRAM_ATTR onTimer()
{
    portENTER_CRITICAL_ISR(&timerMux);
    flag = true;
    portEXIT_CRITICAL_ISR(&timerMux);
}

// Xử lý dữ liệu đọc từ cảm biến
void handleRGB(AdafruitIO_Data *data)
{
    controlRGB(data->toString());
}
void handleFan(AdafruitIO_Data *data)
{
    controlFan(data->toInt());
}
void handlePump1(AdafruitIO_Data *data)
{
    manageWaterPump1(data->toBool());
}
void handlePump2(AdafruitIO_Data *data)
{
    manageWaterPump2(data->toBool());
}

void setup()
{
    pinMode(pump1, OUTPUT);
    pinMode(pump2, OUTPUT);
    pinMode(fan, OUTPUT);
    pinMode(soilMoisture, INPUT);
    pinMode(light, INPUT);

    Serial.begin(115200); // Tăng tốc độ baud để hiển thị nhanh hơn
    Wire.begin();         // Khởi tạo giao tiếp I2C
    DHT.begin();
    lcd.init();
    lcd.backlight();

    io.connect();
    led->onMessage(handleRGB);
    fan_control->onMessage(handleFan);
    pump1_control->onMessage(handlePump1);
    pump2_control->onMessage(handlePump2);

    while (io.status() < AIO_CONNECTED)
    {
        Serial.print(".");
        delay(500);
    }
    Serial.println();
    Serial.println(io.statusText());

    // Cấu hình Timer Interrupt
    timer = timerBegin(0, 80, true); // Timer 0, bộ chia 80 → 1 tick = 1µs
    timerAttachInterrupt(timer, &onTimer, true);
    timerAlarmWrite(timer, 15000000, true); // Gọi ngắt mỗi 5 giây (5.000.000µs)
    timerAlarmEnable(timer);
}

void loop()
{
    io.run(); // Luôn chạy Adafruit IO

    // Kiểm tra cờ ngắt Timer
    if (flag)
    {
        portENTER_CRITICAL(&timerMux);
        flag = false;
        portEXIT_CRITICAL(&timerMux);

        // Thực hiện đọc dữ liệu cảm biến và gửi lên Adafruit IO
        readLight();
        lightSensor->save(Value_Light);

        readDHT20();
        humSensor->save(Humidity);
        tempSensor->save(Temperature);

        readSoilMoisture();
        soilmoistureSensor->save(soilMoisturePercentage);

        lcdDisplay();
    }
}
