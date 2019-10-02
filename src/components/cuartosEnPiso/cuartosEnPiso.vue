<template>
  <div>
    <v-card
      :height="sizeOfCard.height"
      :width="sizeOfCard.width"
      class="overflow-y-auto"
    >
      <v-container grid-list-xl class="overflow-y-">
        <v-layout row wrap justify-space-start>
          <v-flex v-for="(cuarto,index) in cuartos" :key="index" md4>
            <cuartoCard :cuarto="cuarto"></cuartoCard>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
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
      sizeOfCard: {
        width: 0,
        height: 0
      }
    };
  },
  mounted() {
    this.sizeOfCard.width = Math.floor((window.innerWidth-30)/200)*200;
    this.sizeOfCard.height = window.innerHeight - 250;
  }
};
</script>