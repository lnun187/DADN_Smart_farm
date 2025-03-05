#include "../lib/sensor.h"
int Value_Light;
int Temperature;
int Humidity;
int soilMoisturePercentage;
DHT20 DHT(&Wire);
void readDHT20()
{
    if (DHT.read() == 0)
    { // Kiểm tra nếu đọc dữ liệu thành công
        Serial.print("Temperature: ");
        Temperature = DHT.getTemperature();
        Serial.print(Temperature);
        Serial.println(" °C");

        Serial.print("Humidity: ");
        Humidity = DHT.getHumidity();
        Serial.print(Humidity);
        Serial.println(" %");
    }
    else
    {
        Serial.println("Failed to read from DHT20!");
    }
}
void readSoilMoisture()
{
    int soilMoistureValue = analogRead(soilMoisture);
    soilMoisturePercentage = (soilMoistureValue * 100 / 4095);
    Serial.print("Soil Moisture: ");
    Serial.print(soilMoisturePercentage);
    Serial.println("%");
}
void readLight()
{
    int lightValue = analogRead(light);
    int lightPercentage = lightValue * 100 / 4095;
    Value_Light = lightPercentage;
    Serial.print("Light Level: ");
    Serial.println(lightPercentage);
}