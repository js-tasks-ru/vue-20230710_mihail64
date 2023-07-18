import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',

  // Компонент должен иметь входной параметр и порождать событие
  props: { count: { type: Number, required: true, default: 0 } },

  methods: {
    increment() {
      this.$emit('update:count', this.count + 1);
    },
  },

  emits: ['update:count'],

  template: `
    <button type="button" @click="increment">{{ count }}</button>
  `,
});
