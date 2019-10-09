<template>
  <v-container fill-width>
    <v-row>
      <v-col >
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
            @click="setColorAndBrightness"
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
  import api from "@/plugins/api.js";
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
      if(this.state == false){
        api.device.putAction(this.dispositivo.id, "turnOn")
      }
      else{
        api.device.putAction(this.dispositivo.id, "turnOff")
      }
      this.state = !this.state;
      this.state == true ? this.stateColor = "yellow" : this.stateColor = "";

      },

    setColorAndBrightness(){
      api.device.putAction(this.dispositivo.id, "setColor", this.color.substr(1,6));
      api.device.putAction(this.dispositivo.id, "setBrightness", parseInt(this.color.substr(7,8), 16));
    }


  },
  mounted() {
    this.color = this.dispositivo.color ? this.dispositivo.color : this.color;
  }
};
</script>
