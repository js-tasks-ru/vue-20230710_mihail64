<template>
    <slot v-if="status === 'pending'" name="pending" />
    <slot v-else-if="status === 'rejected'" name="rejected" :error="error" />
    <slot v-else name="fulfilled" :result="result" />
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
