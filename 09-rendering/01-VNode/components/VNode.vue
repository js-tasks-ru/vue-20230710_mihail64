<script>
import { isVNode } from 'vue';

export default {
  name: 'VNode',

  props: {
    vnode: {
      type: [Object, Array],
      require: true,
      validator: (value) => (Array.isArray(value) ? value.every((item) => isVNode(item)) : isVNode(value)),
    },
  },
  render() {
    return Array.isArray(this.vnode) ? [...this.vnode] : this.vnode;
  },
};
</script>
