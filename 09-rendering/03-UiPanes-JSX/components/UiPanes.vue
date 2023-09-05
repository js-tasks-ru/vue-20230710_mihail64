<script lang="jsx">
// Предлагается решать задачу с использованием JSX, но вы можете использовать и чистые рендер-функции

import UiButton from './UiButton.vue';

export default {
  name: 'UiPanes',

  components: {
    UiButton,
  },

  data() {
    return {
      slots: [...this.$slots.default()],
    };
  },

  methods: {
    /**
     * Переместить i-ую панель вверх
     *
     * @param {number} i
     */
    up(i) {
      const temp = this.slots[i];
      this.slots[i] = this.slots[i - 1];
      this.slots[i - 1] = temp;
    },

    /**
     * Переместить i-ую панель вниз
     *
     * @param {number} i
     */
    down(i) {
      const temp = this.slots[i];
      this.slots[i] = this.slots[i + 1];
      this.slots[i + 1] = temp;
    },
  },
  render() {
    const content = this.slots.map((value, key, arr) => {
      return (
        <div className="pane">
          <div className="pane__content">{value}</div>
          <div className="pane__controls">
            <UiButton
              class={key == 0 ? 'pane__disabled-button' : ''}
              variant="secondary"
              block
              onClick={() => this.up(key)}
            >
              Up
            </UiButton>
            <UiButton
              class={key == arr.length - 1 ? 'pane__disabled-button' : ''}
              variant="danger"
              block
              onClick={() => this.down(key)}
            >
              Down
            </UiButton>
          </div>
        </div>
      );
    });
    return <div class="panes">{content}</div>;
  },
};
</script>

<style scoped>
.panes {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pane {
  display: flex;
  flex-direction: row;
  border: 3px solid var(--blue-light);
}

.pane__content {
  border-right: 3px solid var(--blue-light);
  padding: 8px;
  flex: 1 0;
}

.pane__controls {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  width: min-content;
}

.pane__disabled-button {
  visibility: hidden;
}
</style>
