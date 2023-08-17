import { ref, watch } from 'vue';

/**
 * @template T
 * @param {Ref<T>} source - Исходный ref
 * @param {number} wait - Ожидание в миллисекундах для debounce
 * @returns {Ref<T>} - Новый ref, обновляющийся с debounce при обновлении исходного ref-а
 */
export function debouncedRef(source, wait) {
  const debounced = ref(source.value);
  let newVal;
  let timeout;

  watch(source, (val) => {
    newVal = val;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => (debounced.value = newVal), wait);
  });
  return debounced;
}
