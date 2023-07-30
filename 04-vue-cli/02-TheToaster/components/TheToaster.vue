<template>
  <div class="toasts">
    <UIToast v-for="toast in toasts" :key="toast.id" :message="toast.message" :type="toast.type" />
  </div>
</template>

<script>
import UIToast from './UIToast.vue';

export default {
  expose: ['success', 'error'],
  name: 'TheToaster',
  components: { UIToast },
  data() {
    return {
      toasts: [],
      counter: 0,
    };
  },
  methods: {
    success(message) {
      this.newToast(message, 'success', 5000);
    },
    error(message) {
      this.newToast(message, 'error', 5000);
    },
    newToast(message, type, timeout) {
      this.toasts.push({ id: this.counter, type: type, message: message });
      setTimeout(
        (id) => {
          this.toasts = this.toasts.filter(function (obj) {
            return obj.id !== id;
          });
        },
        timeout,
        this.counter,
      );
      this.counter++;
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
