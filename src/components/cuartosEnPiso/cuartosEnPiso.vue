<template>
  <v-card
    :height="windowSize.height-250"
    :width="windowSize.width-200"
    class="d-flex flex-row flex-wrap justify-space-around overflow-y-auto "
  >
    <cuartoCard v-for="(cuarto,index) in cuartos" :cuarto="cuarto" :key="index"></cuartoCard>
  </v-card>
</template>

<script>
import CuartoCard from "./cuartoCard.vue";

export default {
  name: "CuartosEnPiso",
  props: ["cuartos"],
  components: {
    CuartoCard
  },
  data() {
    return {
      windowSize: {
        width: 0,
        height: 0
      }
    };
  },
  mounted() {
    this.windowSize.width = window.innerWidth;
    this.windowSize.height = window.innerHeight;
  }
};
</script>