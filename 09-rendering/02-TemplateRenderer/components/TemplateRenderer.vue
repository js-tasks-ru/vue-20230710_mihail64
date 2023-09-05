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
        props: {
          bindings: {
            type: Object,
            default: () => ({}),
          },
        },
        render: compile(this.template)
      });
    },
  },
  render() {
    return h(this.dynamicComponent, {bindings: this.bindings});
  },
};
</script>
