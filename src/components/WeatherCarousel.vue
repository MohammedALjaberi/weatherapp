<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import { useLanguage } from "../composables/useLanguage";
import WeatherCard from "./WeatherCard.vue";
import type { CityWeather } from "../services/weatherService";

const props = defineProps<{
  weatherData: CityWeather[];
}>();

const { t, isRtl } = useLanguage();

const activeIndex = ref(0);
const cardsContainerRef = ref<HTMLElement | null>(null);

const scrollToIndex = (index: number) => {
  activeIndex.value = index;

  if (!cardsContainerRef.value) return;
  const cards = cardsContainerRef.value.querySelectorAll(
    ".weather-card-wrapper"
  );
  if (cards[index]) {
    cards[index].scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }
};

const nextCard = () => {
  if (activeIndex.value < props.weatherData.length - 1) {
    activeIndex.value++;
    scrollToIndex(activeIndex.value);
  }
};

const prevCard = () => {
  if (activeIndex.value > 0) {
    activeIndex.value--;
    scrollToIndex(activeIndex.value);
  }
};

onMounted(() => {
  // Ensure we start aligned
  nextTick(() => {
    scrollToIndex(0);
  });
});
</script>

<template>
  <div class="relative w-full flex items-center min-h-[600px]">
    <!-- Next Button (Visual Left in RTL context) -->
    <!-- In RTL, NEXT is moving to left (decreasing index usually, but here array order is fixed) -->
    <!-- Assuming array order: Riyadh -> Jeddah -> etc. -->
    <!-- Standard carousel behavior: Next = Index + 1. -->

    <!-- RTL/LTR Logic for Buttons:
         If RTL (Arabic): Next (Right) means going back? No.
         Usually in RTL:
         [Next >] is on the Left.
         [< Prev] is on the Right.
         
         But let's stick to logical Next/Prev.
         Next Card (Index++) -> Show Left Button if RTL, Right Button if LTR?
         Let's keep position based on visual flow.
    -->

    <button
      v-if="activeIndex < weatherData.length - 1"
      @click="nextCard"
      class="absolute z-50 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-800 hover:bg-orange-50 hover:scale-110 active:scale-95 transition-all outline-none focus:ring-2 focus:ring-orange-300 rtl:left-4 md:rtl:left-8 ltr:right-4 md:ltr:right-8"
      :aria-label="t('nextCity').value"
    >
      <ChevronLeft v-if="isRtl" class="w-6 h-6" />
      <ChevronRight v-else class="w-6 h-6" />
    </button>

    <button
      @click="prevCard"
      v-if="activeIndex > 0"
      class="absolute z-50 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-800 hover:bg-orange-50 hover:scale-110 active:scale-95 transition-all outline-none focus:ring-2 focus:ring-orange-300 rtl:right-4 md:rtl:right-8 ltr:left-4 md:ltr:left-8"
      :aria-label="t('prevCity').value"
    >
      <ChevronRight v-if="isRtl" class="w-6 h-6" />
      <ChevronLeft v-else class="w-6 h-6" />
    </button>

    <!-- Cards Container -->
    <div
      ref="cardsContainerRef"
      class="w-full flex gap-6 md:gap-10 overflow-hidden snap-x snap-mandatory scroll-smooth px-8 md:px-[max(2rem,calc(50vw-40rem))]"
      style="padding-bottom: 3rem; padding-top: 3rem"
    >
      <div
        v-for="(city, index) in weatherData"
        :key="city.name"
        class="weather-card-wrapper snap-center transition-all duration-500 will-change-transform"
        :class="{
          'z-30 opacity-100 scale-100': activeIndex === index,
          'z-0 opacity-40 scale-90 blur-[1px]': activeIndex !== index,
        }"
        :data-index="index"
        @click="scrollToIndex(index)"
      >
        <div
          class="relative transition-all duration-500"
          :class="{
            'ring-4 ring-orange-300/50 rounded-[2.8rem] shadow-2xl shadow-orange-200/50':
              activeIndex === index,
          }"
        >
          <WeatherCard :city="city" :index="index" />
        </div>
      </div>
    </div>

    <!-- Spacer for last item scroll -->
    <div class="w-1 helper-spacer"></div>
  </div>

  <!-- Pagination Dots -->
  <div class="flex gap-3 mt-4 mb-8">
    <button
      v-for="(_, index) in weatherData"
      :key="index"
      @click="scrollToIndex(index)"
      class="h-3 rounded-full transition-all duration-300"
      :class="
        activeIndex === index
          ? 'w-8 bg-orange-400'
          : 'w-3 bg-gray-300 hover:bg-gray-400'
      "
    ></button>
  </div>
</template>
