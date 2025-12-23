<script setup lang="ts">
import { computed } from "vue";
import type { CityWeather } from "../services/weatherService";
import { useLanguage } from "../composables/useLanguage";
import {
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  CloudLightning,
  Wind,
  Droplets,
  Gauge,
} from "lucide-vue-next";

const props = defineProps<{
  city: CityWeather;
  index: number;
}>();

const { t, currentLang } = useLanguage();

// Simple date formatter
const formattedDate = computed(() => {
  const d = new Date(); // In a real app we might use city.current.time
  return new Intl.DateTimeFormat(
    currentLang.value === "ar" ? "ar-SA" : "en-US",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
    }
  ).format(d);
});

// Weather Description Mapping
const weatherInfo = computed(() => {
  const code = props.city.current.weatherCode;

  // Return Object with { label, icon, color }
  if (code === 0)
    return { label: t("clear").value, icon: Sun, color: "text-amber-500" };
  if (code >= 1 && code <= 3)
    return {
      label: t("partlyCloudy").value,
      icon: CloudSun,
      color: "text-amber-400",
    };
  if (code >= 45 && code <= 48)
    return { label: t("fog").value, icon: Cloud, color: "text-gray-400" };
  if (code >= 51 && code <= 67)
    return { label: t("rain").value, icon: CloudRain, color: "text-blue-500" };
  if (code >= 80)
    return {
      label: t("storm").value,
      icon: CloudLightning,
      color: "text-indigo-600",
    };

  // Default fallback
  return { label: t("unknown").value, icon: Sun, color: "text-amber-500" };
});
</script>

<template>
  <div
    class="weather-card group relative flex-shrink-0 w-[280px] md:w-[320px] h-[450px] bg-white rounded-[2.5rem] shadow-xl overflow-hidden transition-all duration-500 ease-out select-none border-4 border-transparent hover:border-amber-200"
  >
    <!-- Card Content -->
    <div
      class="relative z-10 w-full h-full p-6 flex flex-col justify-between text-slate-800"
    >
      <!-- Top Section -->
      <div class="w-full flex justify-between items-start">
        <div
          class="px-3 py-1 bg-amber-100/50 text-amber-600 rounded-full text-xs font-medium"
          v-if="index === 0"
        >
          {{ t("live").value }}
        </div>
        <div v-else></div>
        <!-- Spacer -->

        <div class="text-end">
          <h2 class="text-2xl font-bold text-slate-900">
            {{ currentLang === "ar" && city.nameAr ? city.nameAr : city.name }}
          </h2>
          <p class="text-xs text-gray-400 font-medium mt-1">
            {{ formattedDate }}
          </p>
        </div>
      </div>

      <!-- Center Icon & Temp -->
      <div class="flex flex-col items-center justify-center flex-1">
        <!-- Icons (SVG) -->
        <!-- Dynamic Icon Component -->
        <div
          class="w-32 h-32 mb-4 drop-shadow-lg flex items-center justify-center transition-colors duration-300"
          :class="weatherInfo.color"
        >
          <component
            :is="weatherInfo.icon"
            class="w-full h-full"
            stroke-width="1.5"
          />
        </div>

        <span class="text-8xl font-bold tracking-tighter text-slate-900">
          {{ Math.round(city.current.temperature) }}
        </span>
        <span class="text-amber-500 font-medium text-lg mt-2">{{
          weatherInfo.label
        }}</span>
      </div>

      <!-- Bottom Details -->
      <div class="grid grid-cols-3 gap-2 border-t border-slate-100 pt-4 mt-4">
        <div class="flex flex-col items-center gap-1">
          <span
            class="opacity-40 text-[10px] uppercase flex items-center gap-1"
          >
            <Droplets class="w-3 h-3" /> {{ t("humidity").value }}
          </span>
          <span class="font-medium text-sm">15%</span>
        </div>
        <div
          class="flex flex-col items-center gap-1 border-s border-e border-slate-100"
        >
          <span
            class="opacity-40 text-[10px] uppercase flex items-center gap-1"
          >
            <Wind class="w-3 h-3" /> {{ t("wind").value }}
          </span>
          <span class="font-medium text-sm">{{
            Math.round(city.current.windSpeed)
          }}</span>
        </div>
        <div class="flex flex-col items-center gap-1">
          <span
            class="opacity-40 text-[10px] uppercase flex items-center gap-1"
          >
            <Gauge class="w-3 h-3" /> {{ t("pressure").value }}
          </span>
          <span class="font-medium text-sm">1013</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-spin-slow {
  animation: spin 12s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
