<!-- <script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style> -->
<template>
  <div class="demo"></div>
</template>

<script lang="ts">
// import ThreeJs from "./three-cube";
// import ThreeJs from "./three-vue2";
// import ThreeJs from "./three-shader-sphere";
import ThreeJs from "./three-shine";
import { defineComponent, onMounted } from "vue";
export default defineComponent({
  name: "Demo01",
  props: {},
  setup() {
    onMounted(() => {
      new ThreeJs();
    });
  },
});
</script>
<style scoped lang="scss"></style>