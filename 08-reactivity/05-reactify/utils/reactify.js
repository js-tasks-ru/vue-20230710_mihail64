import { computed, watchEffect, ref, unref } from 'vue';

/**
 * @template T
 * @param {function(...[*]): T} func - Исходная функция вычисления
 * @returns {function(...[*]): ComputedRef<T>} - Функция вычисления от ref-ов, возвращающая вычисляемое значение computed
 */
export function reactify(func) {
  // ...
  // return () => computed(() => {});
  return (...args) =>
    computed(() => {
      let result = ref();

      watchEffect(() => {
        const rawArgs = args.map((v) => toValue(v));
        result.value = func(...rawArgs);
      });

      return result.value;
    });
}

export function toValue(r) {
  return typeof r === 'function' ? r() : unref(r);
}
