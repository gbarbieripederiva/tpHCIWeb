<template>
  <v-card fill-width class="light-blue my-2">
    <v-container fill-width>
      <v-row class="px-3" align="center">
        <p class="mt-4 mr-2">{{rutina.name}}</p>
        <v-icon @click="deleteRutina">mdi-delete</v-icon>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialogShowRoutine">
          <template v-slot:activator="{on}">
            <v-btn v-on="on" fab class="mr-4">
              <v-icon>mdi-eye</v-icon>
            </v-btn>
          </template>
        </v-dialog>
        <v-btn fab @click="executeRoutine">
          <v-icon>mdi-play</v-icon>
        </v-btn>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import api from "@/plugins/api.js";

export default {
  name: "Rutina",
  props: ["rutina"],
  data() {
    return { dialogShowRoutine: false };
  },
  methods:{
      executeRoutine(){
        this.$emit("executeStat",1);
          api.routines.execute(this.rutina.id).then((r)=>{
              this.$emit("executeStat",2);
          }).catch((e)=>{
              console.error(e);
              this.$emit("executeStat",-1)
          });
      },
      deleteRutina(){
        this.$emit("deleteRutina",this.rutina.id);
      }
  }
};
</script>