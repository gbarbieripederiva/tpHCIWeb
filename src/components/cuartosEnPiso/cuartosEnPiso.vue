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
                @click="dialogAddCuarto=true"
              >
                <v-icon size="200">{{addIcon}}</v-icon>
              </v-card>
              <v-card-title class="justify-center">Añadir cuarto</v-card-title>
              <v-dialog v-model="dialogAddCuarto" width="60em">
                <v-card>
                  <v-container>
                    <v-row>
                      <v-text-field
                        minlength="3"
                        maxlength="60"
                        placeholder="Nombre del cuarto"
                        v-model="newCuarto"
                      ></v-text-field>
                    </v-row>
                    <v-row justify="space-around">
                      <v-btn @click="addCuarto">Comfirmar</v-btn>
                      <v-btn @click="cancelAddCuarto">Cancel</v-btn>
                    </v-row>
                  </v-container>
                </v-card>
              </v-dialog>
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
      },
      addIcon: "mdi-plus",
      dialogAddCuarto: false,
      newCuarto:""
    };
  },
  methods: {
    addCuarto(){
      this.dialogAddCuarto=false;
      console.log(this.newCuarto);
    },
    cancelAddCuarto(){
      this.newCuarto="";
      this.dialogAddCuarto=false;
    }
  },
  mounted() {
    this.sizeOfCard.width = Math.floor((window.innerWidth - 30) / 250) * 200;
    if (this.sizeOfCard.width < 250) {
      this.sizeOfCard.width = 250;
    }
    this.sizeOfCard.height = window.innerHeight - 250;
  }
};
</script>