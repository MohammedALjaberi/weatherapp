<script setup lang="ts">
import { CloudSun, Search, Globe } from "lucide-vue-next";
import { useLanguage } from "../composables/useLanguage";

const { t, toggleLanguage, currentLang } = useLanguage();
</script>

<template>
  <header
    class="relative z-50 flex flex-col md:grid md:grid-cols-3 items-center px-6 md:px-12 py-6 gap-6"
  >
    <!-- Mobile Wrapper for Title and Toggle -->
    <div class="w-full flex items-center justify-between md:contents">
      <!-- Title -->
      <div class="flex items-center gap-4 md:col-start-1">
        <div
          class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 shrink-0"
        >
          <CloudSun class="w-6 h-6" />
        </div>
        <h1
          class="text-xl md:text-2xl font-medium text-slate-900 whitespace-nowrap"
        >
          {{ t("appTitle").value }}
        </h1>
      </div>

      <!-- Language Toggle -->
      <div class="flex md:col-start-3 md:justify-end">
        <button
          @click="toggleLanguage"
          class="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all text-slate-700 font-medium text-sm"
        >
          <Globe class="w-4 h-4" />
          <span>{{ currentLang === "ar" ? "English" : "العربية" }}</span>
        </button>
      </div>
    </div>

    <!-- Search Bar Mock -->
    <div
      class="relative w-full md:w-96 md:col-start-2 md:justify-self-center md:row-start-1"
    >
      <input
        type="text"
        :placeholder="t('searchPlaceholder').value"
        class="w-full bg-[#F3EFE9] rounded-full py-3 px-6 pr-12 rtl:pr-12 rtl:pl-6 ltr:pl-12 ltr:pr-6 text-start focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all text-slate-700 placeholder-slate-400"
      />
      <Search
        class="w-5 h-5 absolute top-3.5 text-gray-400 rtl:right-4 ltr:left-4"
      />
    </div>
  </header>
</template>
