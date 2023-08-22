<template>
  <div class="pagination-container">
    <!-- Контент страницы -->
    <template v-for="item in paginatedItems" :key="item.id">
      <slot :item="item"></slot>
    </template>
  </div>
</template>

<script>
export default {
  name: 'UiPaginationView',
  props: {
    page: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },
    perPage: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  computed: {
    paginatedItems() {
      const startIndex = (this.page - 1) * this.perPage;
      return this.items.slice(startIndex, startIndex + this.perPage);
    },
  },
};
</script>

<style></style>
