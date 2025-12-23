import { ref } from "vue";
import {
  CITIES,
  fetchCityWeather,
  type CityWeather,
} from "../services/weatherService";

export function useWeather() {
  const weatherData = ref<CityWeather[]>([]);
  const loading = ref(true);

  const fetchWeather = async () => {
    loading.value = true;
    const promises = CITIES.map(async (city) => {
      const data = await fetchCityWeather(city.lat, city.lon);
      if (!data) return null;

      return {
        name: city.name,
        nameAr: city.nameAr,
        lat: city.lat,
        lon: city.lon,
        current: {
          temperature: data.current_weather.temperature,
          weatherCode: data.current_weather.weathercode,
          windSpeed: data.current_weather.windspeed,
          isDay: data.current_weather.is_day,
          time: data.current_weather.time,
        },
        hourly: data.hourly,
      } as CityWeather;
    });

    const results = await Promise.all(promises);
    weatherData.value = results.filter((c): c is CityWeather => c !== null);
    loading.value = false;
  };

  return {
    weatherData,
    loading,
    fetchWeather,
  };
}
