<script>
import { compile, defineComponent, h } from 'vue';

export default {
  name: 'TemplateRenderer',
  props: {
    template: {
      type: String,
      required: true,
    },
    bindings: {
      type: Object,
      default: () => ({}),
    },
    components: {
      type: [Object, Array],
      default: () => [],
    },
  },
  computed: {
    dynamicComponent() {
      return defineComponent({
        components: this.components,
        render: () => compile(this.template)({ bindings: this.bindings })
      });
    },
  },
  render() {
    return h(this.dynamicComponent);
  },
};
</script>
