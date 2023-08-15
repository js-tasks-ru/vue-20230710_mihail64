<template>
  <button @click="increment">{{ localCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      localCount: this.count,
    };
  },
  methods: {
    increment() {
      this.localCount++;
      this.$emit('update:count', this.localCount);
    },
  },
  watch: {
    count(val) {
      this.localCount = val;
    },
  },
  emits: ['update:count'],
};
</script>
