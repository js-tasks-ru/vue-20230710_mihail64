<script>
import { compile } from 'vue';

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
  methods: {
    setComponents() {
      for (const componentName in this.components) {
        this.$options.components[componentName] = this.components[componentName];
      }
    },
  },
  components: {},
  created() {
    this.setComponents();
  },
  beforeUpdate() {
    this.setComponents();
  },
  render() {
    const renderFunction = compile(this.template);
    return renderFunction({ bindings: this.bindings });
  },
};
</script>
