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
              <v-slider @change="setTemp" v-model="temp" :max="tempRange[1]" step="1" :min="tempRange[0]" thumb-label></v-slider>
            </v-row>
          </v-col>
        </v-row>
        <v-row justify="center" align="center">
          <!-- modo -->
          <v-menu bottom offset-y origin="center top" transition="scale-transition" >
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
                <v-btn text x-large outlined v-on="on">{{velocidad==="auto"?velocidad:velocidad+"%"}}</v-btn>
              </template>
              <v-list color="light-blue" flat nav>
                <v-list-item
                  v-for="(velocidad,index) in velocidades"
                  :key="index"
                  @click="()=>{ changeVelocidad(velocidad)}"
                >
                  <v-list-item-title>{{velocidad==="auto"?velocidad:velocidad+"%"}}</v-list-item-title>
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
            <v-slider
              vertical
              v-model="yAxis"
              :disabled="autoY"
              min="0"
              max="3"
              @change="changeYaxis"
            >
              <template v-slot:append>
                <v-icon>mdi-axis-arrow</v-icon>
              </template>
            </v-slider>
          </v-col>
          <v-col>
            <v-switch v-model="autoY" @change="changeAutoY">
              <template v-slot:append>
                <v-icon>mdi-arrow-up-down</v-icon>
              </template>
            </v-switch>
            <v-switch v-model="autoX" @change="changeAutoX">
              <template v-slot:append>
                <v-icon>mdi-arrow-left-right</v-icon>
              </template>
            </v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-slider :disabled="autoX" min="0" max="4" v-model="xAxis" @change="changeXaxis"></v-slider>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "../../../plugins/api";

export default {
  name: "AireAcondicionado",
  props: ["dispositivo"],
  data() {
    return {
      prendido: false,
      colorPrendido: "",
      temp: 18,
      tempRange: [18, 38],
      modos: ["Ventilacion", "Calor", "Frio"],
      modo: "Ventilacion",
      modoTranslater:{
        "Ventilacion":"fan",
        "Calor":"heat",
        "Frio":"cool"
      },
      yAxisValues: ["22", "45", "67", "90"],
      yAxis: 0,
      xAxis: 2,
      xAxisValues: ["-90", "-45", "0", "45", "90"],
      autoX: false,
      autoY: false,
      velocidad: "100",
      velocidades: ["100", "75", "50", "25", "auto"]
    };
  },
  methods: {
    setTemp(){
      if (!this.dispositivo.routines) {
        api.device
          .putAction(this.dispositivo.id, "setTemperature", [
            this.temp
          ])
          .then(r => {
            this.dispositivo.state.temperature = this.temp;
          })
          .catch(e => {
            console.error(e);
          });
      }else{
        this.dispositivo.routines.actions[1].params=[this.temp];
      }
    },
    changeModo(modo) {
      this.modo = modo;
      if (!this.dispositivo.routines) {
        api.device
          .putAction(this.dispositivo.id, "setMode", [this.modoTranslater[this.modo]])
          .catch(e => {
            console.error(e);
          });
      }else{
        this.dispositivo.routines.actions[2].params=[this.modoTranslater[this.modo]];
      }
    },
    changeVelocidad(velocidad) {
      this.velocidad = velocidad;
      if (!this.dispositivo.routines) {
        api.device
          .putAction(this.dispositivo.id, "setFanSpeed", [this.velocidad])
          .catch(e => {
            console.error(e);
          });
      }else{
        this.dispositivo.routines.actions[5].params=[this.velocidad];
      }
    },
    power() {
      this.prendido = !this.prendido;
      if (this.prendido) {
        this.colorPrendido = "light-green";
      } else {
        this.colorPrendido = "";
      }
      if (!this.dispositivo.routines) {
        let action = this.prendido === true ? "turnOn" : "turnOff";
        api.device.putAction(this.dispositivo.id, action).catch(e => {
          console.error(e);
        });
      }else{
        this.dispositivo.routines.actions[0].name=this.prendido?"turnOn":"turnOff";
      }
    },
    changeYaxis(e) {
      if (!this.dispositivo.routines) {
        api.device
          .putAction(this.dispositivo.id, "setVerticalSwing", [
            this.yAxisValues[e].toString()
          ])
          .then(r => {
            this.dispositivo.state.verticalSwing = this.yAxisValues[e];
          })
          .catch(e => {
            console.error(e);
          });
      }else{
        this.dispositivo.routines.actions[3].params=[this.yAxisValues[e]];
      }
    },
    changeXaxis(e) {
      if (!this.dispositivo.routines) {
        api.device
          .putAction(this.dispositivo.id, "setHorizontalSwing", [
            this.xAxisValues[e].toString()
          ])
          .then(r => {
            this.dispositivo.state.horizontalSwing = this.xAxisValues[e];
          })
          .catch(e => {
            console.error(e);
          });
      }else{
        this.dispositivo.routines.actions[4].params=[this.xAxisValues[e]];
      }
    },
    changeAutoY(e) {
      if (!this.dispositivo.routines) {
        let action = e ? "auto" : "22";
        api.device
          .putAction(this.dispositivo.id, "setVerticalSwing", [
            action.toString()
          ])
          .then(r => {
            this.yAxis = 0;
            this.dispositivo.state.horizontalSwing = action;
          })
          .catch(e => {
            console.error(e);
          });
      }else{
        this.dispositivo.routines.actions[3].params=e?["auto"]:["22"];
      }
    },
    changeAutoX(e) {
      if (!this.dispositivo.routines) {
        let action = e ? "auto" : "0";
        api.device
          .putAction(this.dispositivo.id, "setHorizontalSwing", [
            action.toString()
          ])
          .then(r => {
            this.xAxis = 2;
            this.dispositivo.state.verticalSwing = action;
          })
          .catch(e => {
            console.error(e);
          });
      }else{
        this.dispositivo.routines.actions[4].params=e?["auto"]:["0"];
      }
    }
  },
  mounted() {
    if (!this.dispositivo.routines) {
      let i = this.yAxisValues.indexOf(
        parseInt(this.dispositivo.state.verticalSwing)
      );
      let j = this.xAxisValues.indexOf(
        parseInt(this.dispositivo.state.horizontalSwing)
      );
      this.yAxis = i > 0 ? i : 0;
      this.xAxis = j > 0 ? j : 2;
      this.autoY = i > 0 ? false : true;
      this.autoX = j > 0 ? false : true;
      this.velocidad = this.dispositivo.state.fanSpeed;
      this.modo = this.dispositivo.state.mode;
      this.temp = this.dispositivo.state.temperature;
      this.prendido = this.dispositivo.state.status === "on" ? true : false;
      this.colorPrendido = this.prendido ? "light-green" : "";
    }else{
      this.dispositivo.routines.actions=[
        {name:"turnOff",params:[]},
        {name:"setTemperature",params:[this.temp]},
        {name:"setMode",params:[this.modoTranslater[this.modo]]},
        {name:"setVerticalSwing",params:[this.yAxisValues[this.yAxis]]},
        {name:"setHorizontalSwing",params:[this.xAxisValues[this.xAxis]]},
        {name:"setFanSpeed",params:[this.velocidad]}
      ]
    }
  }
};
</script>