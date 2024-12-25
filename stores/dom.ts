export const useDomStore = defineStore("domStore", () => {
  const headerDomHeight = ref<number | null>(null)


  const setHeaderDomHeight = (height: number) => {
    headerDomHeight.value = height
  }
  const getHeaderDomHeight = computed(() => headerDomHeight.value)

  return {
    headerDomHeight,
    getHeaderDomHeight,
    setHeaderDomHeight
  };
});