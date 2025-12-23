import axios from "axios";

export interface WeatherData {
  temperature: number;
  weatherCode: number;
  windSpeed: number;
  isDay: number;
  time: string;
}

export interface CityWeather {
  name: string;
  nameAr?: string;
  lat: number;
  lon: number;
  current: WeatherData;
  hourly: {
    time: string[];
    temperature_2m: number[];
  };
}

export const CITIES = [
  { name: "Riyadh", nameAr: "الرياض", lat: 24.7136, lon: 46.6753 },
  { name: "Jeddah", nameAr: "جدة", lat: 21.5433, lon: 39.1728 },
  { name: "Dammam", nameAr: "الدمام", lat: 26.4207, lon: 50.0888 },
  { name: "Makkah", nameAr: "مكة المكرمة", lat: 21.3891, lon: 39.8579 },
  { name: "Madinah", nameAr: "المدينة المنورة", lat: 24.5247, lon: 39.5692 },
  { name: "Tabuk", nameAr: "تبوك", lat: 28.3835, lon: 36.5657 },
  { name: "Abha", nameAr: "أبها", lat: 18.2164, lon: 42.5053 },
  { name: "Hail", nameAr: "حائل", lat: 27.5114, lon: 41.7208 },
  { name: "Jizan", nameAr: "جازان", lat: 16.8894, lon: 42.5511 },
];

const GRADIENT_DEFAULTS = "from-blue-500 to-cyan-400";

const GRADIENT_LOOKUP: Record<number, { day: string; night: string } | string> =
  {
    // Clear
    0: {
      day: "from-yellow-400 to-orange-500",
      night: "from-slate-900 to-slate-700",
    },
    // Partly Cloudy
    1: { day: "from-blue-400 to-blue-300", night: "from-gray-800 to-gray-600" },
    2: { day: "from-blue-400 to-blue-300", night: "from-gray-800 to-gray-600" },
    3: { day: "from-blue-400 to-blue-300", night: "from-gray-800 to-gray-600" },
    // Fog
    45: "from-gray-400 to-gray-200",
    48: "from-gray-400 to-gray-200",
  };

const RANGE_GRADIENTS = [
  { min: 51, max: 67, val: "from-blue-700 to-blue-500" }, // Rain
  { min: 80, max: 99, val: "from-indigo-900 to-purple-800" }, // Storms
];

export const getWeatherGradient = (code: number, isDay: number): string => {
  // 1. Direct Lookup
  const direct = GRADIENT_LOOKUP[code];
  if (direct) {
    if (typeof direct === "string") return direct;
    return isDay ? direct.day : direct.night;
  }

  // 2. Range Lookup
  for (const range of RANGE_GRADIENTS) {
    if (code >= range.min && code <= range.max) return range.val;
  }

  // 3. Default
  return GRADIENT_DEFAULTS;
};

export const fetchCityWeather = async (
  lat: number,
  lon: number
): Promise<any> => {
  try {
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m&timezone=auto`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
};
