<template>
  <div class="demo"></div>
</template>

<script lang="ts">
import ThreeJs from "./three-shader-sphere";
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