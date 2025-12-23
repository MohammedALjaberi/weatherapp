<script setup lang="ts">
import { onMounted } from "vue";
import { useWeather } from "./composables/useWeather";
import { useLanguage } from "./composables/useLanguage";
import AppHeader from "./components/AppHeader.vue";
import WeatherCarousel from "./components/WeatherCarousel.vue";

const { weatherData, loading, fetchWeather } = useWeather();
const { t, dir } = useLanguage();

onMounted(() => {
  fetchWeather();
});
</script>

<template>
  <div
    class="app-container min-h-screen relative overflow-hidden font-sans"
    :dir="dir"
  >
    <!-- Background Pattern -->
    <div
      class="absolute inset-0 z-0 opacity-40 bg-dots pointer-events-none"
    ></div>

    <AppHeader />

    <main class="relative z-10 flex flex-col items-center pt-8 h-full">
      <!-- Title -->
      <div class="w-full max-w-7xl px-8 mb-8 text-start">
        <span class="text-orange-400 font-medium text-sm">{{
          t("weatherToday").value
        }}</span>
        <h2 class="text-5xl md:text-6xl font-black text-slate-900 mt-2">
          {{ t("cityForecast").value }}
        </h2>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex items-center justify-center h-64 w-full">
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"
        ></div>
        <span class="sr-only">{{ t("loading").value }}</span>
      </div>

      <!-- Carousel -->
      <WeatherCarousel v-else :weatherData="weatherData" />
    </main>
  </div>
</template>
