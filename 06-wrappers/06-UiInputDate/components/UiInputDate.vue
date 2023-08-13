<template>
  <UiInput ref="UiInput" v-model="modelValueProxy" :type="type">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </UiInput>
</template>

<script>
import UiInput from './UiInput.vue';
import UiIcon from './UiIcon.vue';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export default {
  name: 'UiInputDate',
  components: { UiInput, UiIcon },
  props: {
    type: { type: String, default: 'date' },
    modelValue: { type: Number, default: null },
    step: { type: String, default: '1' },
  },
  computed: {
    modelValueProxy: {
      get() {
        if (this.modelValue == null) {
          return '';
        }
        switch (this.type) {
          case 'date':
            return dayjs(this.modelValue).utc().format('YYYY-MM-DD');
          case 'datetime-local':
            return dayjs(this.modelValue).utc().format('YYYY-MM-DD HH:mm');
          default:
            return dayjs(this.modelValue).utc().format('HH:mm');
        }
      },
      set() {
        //Тесты вроде проходят и все работает но как-то меня смущает данная конструкция
        //по идее нужно хотябы через expose в UIInput ref на input объявить
        this.$emit('update:modelValue', this.$refs.UiInput.$refs.input.valueAsNumber);
      },
    },
  },
  emits: ['update:modelValue'],
};
</script>
