<template>
  <template v-if="status === 'pending'">
    <slot name="pending" />
  </template>
  <template v-if="status === 'rejected'">
    <slot name="rejected" :error="error" />
  </template>
  <template v-if="status === 'fulfilled'">
    <slot name="fulfilled" :result="result" />
  </template>
</template>

<script>
export default {
  name: 'PromiseWrapper',

  props: {
    promise: {
      type: Promise,
      required: true,
    },
  },
  data() {
    return {
      status: 'pending',
      error: null,
      result: null,
    };
  },
  methods: {
    async resolvePromise(promise) {
      try {
        this.result = await promise;
        this.status = 'fulfilled';
      } catch (e) {
        this.status = 'rejected';
        this.error = e;
      }
    },
  },
  watch: {
    promise: {
      handler(newPromise) {
        this.status = 'pending';
        this.error = null;
        this.result = null;
        this.resolvePromise(newPromise);
      },
      immediate: true,
    },
  },
};
</script>
