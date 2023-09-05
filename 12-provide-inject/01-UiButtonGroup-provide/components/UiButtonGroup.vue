<template>
  <div class="button-group" role="group">
    <slot></slot>
  </div>
</template>

<script>
import { toRef } from "vue";

export default {
  name: 'UiButtonGroup',

  props: {
    modelValue: {
      required: true,
    },
  },

  methods: {
    setModelValue(value) {
      this.$emit('update:modelValue', value);
    }
  },
  emits: ['update:modelValue'],
  provide() {
    return {
      UiButtonGroupModel: toRef(this.$props, 'modelValue'),
      setUiButtonGroupModel: this.setModelValue,
    };
  },
};
</script>

<style scoped>
.button-group {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  white-space: nowrap;
}
</style>
