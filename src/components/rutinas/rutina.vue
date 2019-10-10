<template>
  <v-card fill-width class="light-blue my-2">
    <v-container fill-width>
      <v-row class="px-3" align="center">
        <p>{{rutina.name}}</p>
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
          api.routines.execute(this.rutina.id).then((r)=>{
              console.log(r);
          }).catch((e)=>{
              console.error(e);
              
          });
      }
  }
};
</script>