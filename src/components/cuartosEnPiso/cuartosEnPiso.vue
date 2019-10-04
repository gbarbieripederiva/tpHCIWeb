<template>
  <div>
    <v-card :height="sizeOfCard.height" :width="sizeOfCard.width" class="overflow-y-auto">
      <v-container grid-list-xl class="overflow-y-">
        <v-layout row wrap justify-space-start>
          <v-flex v-for="(cuarto,index) in cuartos" :key="index" md4>
            <cuartoCard :cuarto="cuarto"></cuartoCard>
          </v-flex>
          <v-flex md4>
            <v-card height="250" width="250" align="center" justify="center" flat>
              <v-card
                height="200"
                width="200"
                color="grey"
                align="center"
                justify="center"
                @click="addCuarto"
              >
              <v-icon size="200" >{{addIcon}}</v-icon>
              </v-card>
              <v-card-title class="justify-center">Añadir ambiente</v-card-title>
            </v-card>
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
      },addIcon:'mdi-plus'
    };
  },
  methods:{
    addCuarto:()=>{
      console.log("add cuarto");
    }
  }
  ,
  mounted() {
    this.sizeOfCard.width = Math.floor((window.innerWidth - 30) / 200) * 200;
    this.sizeOfCard.height = window.innerHeight - 250;
  }
};
</script>