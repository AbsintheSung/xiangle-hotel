// plugins/number-format.ts
export default defineNuxtPlugin((nuxtApp) => {
  const numberFormat = (value: number, locale: string = 'zh-TW') => {
    const currency = new Intl.NumberFormat(locale).format(value);
    // return new Intl.NumberFormat(locale).format(value);
    return `NT$\u00A0${currency}` // \u00A0不間斷空格字元
  };
  nuxtApp.vueApp.directive('number-format', {
    mounted(el, binding) {
      const value = binding.value;
      const locale = binding.arg || 'zh-TW';
      el.innerText = numberFormat(value, locale);
    },
  });
});

