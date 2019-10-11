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
          ></v-color-picker>
        </v-row>
        <v-row>
          <v-slider
                  step="1"
                  ticks
                  v-model="brightness"
                  :min="0"
                  :max="100"
                  @click="setBrightness"

          >
            <template v-slot:prepend>
              <v-icon>mdi-brightness-4</v-icon>
            </template>
            <template v-slot:append>
              <v-icon>mdi-brightness-5</v-icon>
            </template>
          </v-slider>
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
    watch:{
      color(){
        this.setColor();
      }
    },
    data() {
      return {
        color: "",
        state:false,
        stateColor: "",
        brightness: 50
      };
    },
    methods:{
      changeState(){
        if(!this.dispositivo.routines) {
          if (this.state == false) {
            api.device.putAction(this.dispositivo.id, "turnOn")
          } else {
            api.device.putAction(this.dispositivo.id, "turnOff")
          }
        }
        this.state = !this.state;
        this.state == true ? this.stateColor = "yellow" : this.stateColor = "";

      },

      setColor(){
        if(!this.dispositivo.routines) {
          api.device.putAction(this.dispositivo.id, "setColor", [this.color.substr(1, 6)]);
        }

      },
      setBrightness(){
        if(!this.dispositivo.routines) {
          api.device.putAction(this.dispositivo.id, "setBrightness", [this.brightness]);
        }
      }


    },
    mounted(){
      this.color = "#".concat(this.dispositivo.state.color);
      this.brightness = this.dispositivo.state.brightness;
      this.state = (this.dispositivo.state.status == "on" ? true : false);
      this.stateColor = this.state == true ? "yellow" : "";

    }
  };
</script>

