<template>
  <v-container fill-width>
    <v-row justify="center">
      <v-switch @change="changeDirection" v-model="moveUp" vertical>
        <template v-slot:prepend>
          <v-icon>mdi-arrow-down</v-icon>
        </template>
        <template v-slot:append>
          <v-icon>mdi-arrow-up</v-icon>
        </template>
      </v-switch>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "PersianaRutina",
  props: ["dispositivo"],
  data() {
    return {
      moveUp: false
    };
  },
  methods: {
    changeDirection(e) {
      if(e){
        this.dispositivo.routines.actions[0].name = "open";

      }else{

        this.dispositivo.routines.actions[0].name = "close";
      }
    }
  },
  mounted() {
    this.dispositivo.routines.actions = [{ name: "close", params: [] }];
  }
};
</script>