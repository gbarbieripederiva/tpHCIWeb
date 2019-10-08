<template>
  <v-container fill-width>
    <v-row>
      <v-col>
        <v-row></v-row>
        <v-row align="center" justify="center">
          <p>Color/Intesidad</p>
          <v-color-picker
            class="transparent"
            flat
            :hide-canvas="true"
            v-model="color"
            :hide-mode-switch="false"
            mode="rgba"
          ></v-color-picker>
        </v-row>
      </v-col>
      <v-col>
        <v-row justify="center" align="center">
          <div>
            <v-icon size="500%" :color="stateColor" @click="changeState">mdi-lightbulb</v-icon>
          </div>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Lampara",
  props: ["dispositivo"],
  data() {
    return {
      color: "",
      state:false,
      stateColor:""
    };
  },
  methods:{
    changeState(){
      this.state=!this.state;
      this.stateColor=this.state?"yellow":"";
    }
  },
  mounted() {
    this.color = this.dispositivo.color ? this.dispositivo.color : this.color;
  }
};
</script>
