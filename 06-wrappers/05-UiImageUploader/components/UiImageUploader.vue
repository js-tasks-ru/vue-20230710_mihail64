<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      @click="handleClick"
      :class="{ 'image-uploader__preview-loading': state === 'loading' }"
      :style="[localPreview ? `--bg-url: url(${localPreview})` : '']"
    >
      <span class="image-uploader__text"> {{ stateText }}</span>
    </label>
    <!--
    Вынес input из label и не стал их связывать чтобы не было проблемы с передачей лишних кликов.
    Возможно есть более правильный способ, у меня побороть проблему модификаторам так и не получилось.
     -->
    <input
      ref="input"
      type="file"
      v-bind="$attrs"
      accept="image/*"
      class="image-uploader__input"
      @change="handleSelect"
    />
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',
  props: {
    preview: {
      type: String,
      default: '',
    },
    uploader: {
      type: Function,
      default: null,
    },
  },
  inheritAttrs: false,
  data() {
    return {
      isLoading: false,
      localPreview: this.preview,
    };
  },
  computed: {
    state() {
      if (this.isLoading) return 'loading';
      else if (this.localPreview) return 'loaded';
      else return 'empty';
    },
    stateText() {
      switch (this.state) {
        case 'empty':
          return 'Загрузить изображение';
        case 'loading':
          return 'Загрузка...';
        default:
          return 'Удалить изображение';
      }
    },
  },
  emits: ['select', 'upload', 'error', 'remove'],
  methods: {
    handleClick() {
      if (this.state === 'loaded') {
        this.remove();
      } else {
        this.$refs.input.click();
      }
    },
    async handleSelect() {
      this.$emit('select', this.$refs.input.files[0]);
      this.localPreview = URL.createObjectURL(this.$refs.input.files[0]);
      if (this.uploader) {
        this.isLoading = true;
        try {
          const resp = await this.uploader(this.$refs.input.files[0]);
          this.$emit('upload', resp);
        } catch (e) {
          this.remove();
          this.$emit('error', e);
        } finally {
          this.isLoading = false;
        }
      }
    },
    remove() {
      this.localPreview = '';
      this.$refs.input.value = '';
      this.$emit('remove');
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
