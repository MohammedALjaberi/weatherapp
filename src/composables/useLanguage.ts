import { ref, computed } from "vue";
import { translations } from "../constants/translations";

type Language = "ar" | "en";

const currentLang = ref<Language>("ar");

export function useLanguage() {
  const toggleLanguage = () => {
    currentLang.value = currentLang.value === "ar" ? "en" : "ar";
    document.documentElement.dir = isRtl.value ? "rtl" : "ltr";
    document.documentElement.lang = currentLang.value;
  };

  const isRtl = computed(() => currentLang.value === "ar");
  const dir = computed(() => (isRtl.value ? "rtl" : "ltr"));

  const t = (key: keyof (typeof translations)["ar"]) => {
    return computed(() => translations[currentLang.value][key] || key);
  };

  // Helper for non-reactive access if needed (though computed is preferred for templates)
  const t_raw = (key: keyof (typeof translations)["ar"]) => {
    return translations[currentLang.value][key] || key;
  };

  return {
    currentLang,
    isRtl,
    dir,
    toggleLanguage,
    t,
    t_raw,
  };
}
