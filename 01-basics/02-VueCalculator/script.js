import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const App = defineComponent({
  name: 'App',
  data() {
    return {
      a: 0,
      b: 0,
      operator: 'sum',
    };
  },
  computed: {
    result() {
      switch (this.operator) {
        case 'sum': return this.a + this.b;
        case 'subtract': return this.a - this.b;
        case 'multiply': return this.a * this.b;
        case 'divide': return this.a / this.b;
      }
      return 0;
    },
  },
  template: `
    <div class="row">
    <div class="col">
      <input type="number" v-model="a" />
    </div>

    <div class="col" style="display: flex; flex-direction: column; font-family: emoji">
      <label><input type="radio" name="operator" value="sum" v-model="operator" /> ➕</label>
      <label><input type="radio" name="operator" value="subtract" v-model="operator" /> ➖</label>
      <label><input type="radio" name="operator" value="multiply" v-model="operator" /> ✖</label>
      <label><input type="radio" name="operator" value="divide" v-model="operator" /> ➗</label>
    </div>

    <div class="col">
      <input type="number" v-model="b" />
    </div>

    <div class="col">=</div>

    <output class="col">{{ result }}</output>
    </div>
  `
});
const app = createApp(App);
app.mount('#app');
