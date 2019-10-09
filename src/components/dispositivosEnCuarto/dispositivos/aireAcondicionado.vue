<template>
  <v-container fill-width>
    <v-row>
      <v-col>
        <v-row class="pl-1" justify="start" align="center">
          <!-- encendido -->
          <v-icon @click="power" :color="colorPrendido" large>mdi-power</v-icon>
        </v-row>
        <v-row class="px-3">
          <v-col>
            <!-- slider temperatura -->
            <v-row justify="center" align="center">
              <v-icon>mdi-thermometer-low</v-icon>
            </v-row>
            <v-row justify="center" align="center">
              <v-slider v-model="temp" :max="tempRange[1]" step="1" :min="tempRange[0]" thumb-label></v-slider>
            </v-row>
          </v-col>
        </v-row>
        <v-row justify="center" align="center">
          <!-- modo -->
          <v-menu bottom offset-y origin="center top" transition="scale-transition">
            <template v-slot:activator="{ on }">
              <v-btn text x-large outlined v-on="on">{{modo}}</v-btn>
            </template>
            <v-list color="light-blue" flat nav>
              <v-list-item
                v-for="(modo,index) in modos"
                :key="index"
                @click="()=>{ changeModo(modo)}"
              >
                <v-list-item-title>{{modo}}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-row>
      </v-col>
      <v-col>
        <!--velocidad -->
        <v-container fill-height>
          <v-row align="center" justify="center">
            <v-icon>mdi-fan</v-icon>
            <v-menu bottom offset-y origin="center top" transition="scale-transition">
              <template v-slot:activator="{ on }">
                <v-btn text x-large outlined v-on="on">{{velocidad}}</v-btn>
              </template>
              <v-list color="light-blue" flat nav>
                <v-list-item
                  v-for="(velocidad,index) in velocidades"
                  :key="index"
                  @click="()=>{ changeVelocidad(velocidad)}"
                >
                  <v-list-item-title>{{velocidad}}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-row>
        </v-container>
      </v-col>
      <v-col>
        <!-- direccion aspas -->
        <v-row>
          <v-col></v-col>
          <v-col>
            <v-slider vertical :disabled="autoY">
              <template v-slot:append>
                <v-icon>mdi-axis-arrow</v-icon>
              </template>
            </v-slider>
          </v-col>
          <v-col>
            <v-switch v-model="autoY">
              <template v-slot:append>
                <v-icon>mdi-arrow-up-down</v-icon>
              </template>
            </v-switch>
            <v-switch v-model="autoX">
              <template v-slot:append>
                <v-icon>mdi-arrow-left-right</v-icon>
              </template>
            </v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-slider :disabled="autoX"></v-slider>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "../../../plugins/api";

export default {
  name: "AireAcondicionado",
  props:["dispositivo"],
  data() {
    return {
      prendido: false,
      colorPrendido: "light-green",
      temp: 18,
      tempRange: [18, 38],
      modos: ["Ventilacion", "Calor", "Frio"],
      modo: "Ventilacion",
      xAxis: 0,
      xAxisRange: [-90, 90],
      yAxis: 0,
      autoX: false,
      autoY: false,
      velocidad: "100%",
      velocidades: ["100%", "75%", "50%", "25%", "Auto"]
    };
  },
  methods: {
    changeModo(modo) {
      this.modo = modo;
      api.device.putAction(this.dispositivo.id, "setMode", [this.modo]).catch(e => {console.error(e);
      });
    },
    changeVelocidad(velocidad) {
      this.velocidad = velocidad;
      api.device.putAction(this.dispositivo.id, "setFanSpeed", [this.velocidad]).catch(e => {console.error(e);
      });
    },
    power(){
      this.prendido=!this.prendido;
      if(this.prendido){
        this.colorPrendido="light-green";
      }else{
        this.colorPrendido="";
      }
      let action = (this.prendido === true ? "turnOn" : "turnOff");
      api.device.putAction(this.dispositivo.id, action).catch(e => {console.error(e);
      });
    }
  }
};
</script>