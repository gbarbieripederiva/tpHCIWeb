<template>
  <v-container fill-width>
    <v-row justify="center" align="center">
      <v-col cols="4">
        <v-row justify="center" align="center">
          Freezer
          <v-icon>mdi-thermometer-low</v-icon>
        </v-row>
        <v-row justify="center" align="center">
          <v-slider
            step="1"
            ticks
            v-model="tempFreezer"
            :max="tempFrezeerRange[1]"
            :min="tempFrezeerRange[0]"
            @click="setFreezerTemp"
          >
            <template v-slot:append>
              <v-icon @click="plusFrezeerTemp">mdi-plus</v-icon>
            </template>
            <template v-slot:prepend>
              <v-icon @click="minusFrezeerTemp">mdi-minus</v-icon>
            </template>
            <template v-slot:thumb-label>{{tempFreezer + unit}}</template>
          </v-slider>
        </v-row>
      </v-col>
      <v-col offset="1" cols="4">
        <v-row justify="center" align="center">
          Heladera
          <v-icon>mdi-thermometer-low</v-icon>
        </v-row>
        <v-row justify="center" align="center">
          <v-slider
            step="1"
            ticks
            v-model="tempHeladera"
            :min="tempHeladeraRange[0]"
            :max="tempHeladeraRange[1]"
            @click="setTemp"
          >
            <template v-slot:append>
              <v-icon @click="plusHeladeraTemp">mdi-plus</v-icon>
            </template>
            <template v-slot:prepend>
              <v-icon @click="minusHeladeraTemp">mdi-minus</v-icon>
            </template>
            <template v-slot:thumb-label>{{tempHeladera + unit}}</template>
          </v-slider>
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-menu bottom offset-y origin="center top" transition="scale-transition">
        <template v-slot:activator="{ on }">
          <v-btn text outlined v-on="on">{{modo}}</v-btn>
        </template>
        <v-list color="light-blue" flat nav>
          <v-list-item v-for="(modo,index) in modos" :key="index" @click="()=>{ changeModo(modo)}">
            <v-list-item-title>{{modo}}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/plugins/api";

export default {
  name: "heladera",
  props: ["dispositivo"],
  data() {
    return {
      modos: ["Fiesta", "Vacaciones", "Normal"],
      modo: "Normal",
      tempFreezer: -10,
      tempHeladera: 5,
      tempFrezeerRange: [-20, -8],
      tempHeladeraRange: [2, 8],
      unit: "°C"
    };
  },
  methods: {
    setTemp() {
      if (!this.dispositivo.routines) {
        api.device
          .putAction(this.dispositivo.id, "setTemperature", [this.tempHeladera])
          .catch(e => {
            console.error(e);
          });
      }else{
        this.dispositivo.routines.actions[1].params=[this.tempHeladera];
      }
    },
    setFreezerTemp() {
      if (!this.dispositivo.routines) {
        api.device
          .putAction(this.dispositivo.id, "setFreezerTemperature", [
            this.tempFreezer
          ])
          .catch(e => {
            console.error(e);
          });
      }else{
        this.dispositivo.routines.actions[2].params=[this.tempFreezer];
      }
    },
    changeModo(modo) {
      this.modo = modo;
      if (!this.dispositivo.routines) {
        api.device
          .putAction(this.dispositivo.id, "setMode", [this.modo])
          .catch(e => {
            console.error(e);
          });
      }else{
        this.dispositivo.routines.actions[0].params=[this.modo];
      }
    },
    plusFrezeerTemp() {
      if (this.tempFreezer < this.tempFrezeerRange[1]) {
        this.tempFreezer += 1;
        if (!this.dispositivo.routines) {
          api.device
            .putAction(this.dispositivo.id, "setFreezerTemperature", [
              this.tempFreezer
            ])
            .catch(e => {
              console.error(e);
            });
        } else {
          this.dispositivo.routines.actions[2].params = [this.tempFreezer];
        }
      }
    },
    plusHeladeraTemp() {
      if (this.tempHeladera < this.tempHeladeraRange[1]) {
        this.tempHeladera += 1;
        if (!this.dispositivo.routines) {
          api.device
            .putAction(this.dispositivo.id, "setTemperature", [
              this.tempHeladera
            ])
            .catch(e => {
              console.error(e);
            });
        } else {
          this.dispositivo.routines.actions[1].params = [this.tempHeladera];
        }
      }
    },
    minusHeladeraTemp() {
      if (this.tempHeladera > this.tempHeladeraRange[0]) {
        this.tempHeladera -= 1;
        if (!this.dispositivo.routines) {
          api.device
            .putAction(this.dispositivo.id, "setTemperature", [
              this.tempHeladera
            ])
            .catch(e => {
              console.error(e);
            });
        } else {
          this.dispositivo.routines.actions[1].params = [this.tempHeladera];
        }
      }
    },
    minusFrezeerTemp() {
      if (this.tempFreezer > this.tempFrezeerRange[0]) {
        this.tempFreezer -= 1;
        if (!this.dispositivo.routines) {
          api.device
            .putAction(this.dispositivo.id, "setFreezerTemperature", [
              this.tempFreezer
            ])
            .catch(e => {
              console.error(e);
            });
        } else {
          this.dispositivo.routines.actions[2].params = [this.tempFreezer];
        }
      }
    }
  },
  mounted() {
    if (!this.dispositivo.routines) {
      this.modo = this.dispositivo.state.mode;
      this.tempFreezer = this.dispositivo.state.freezerTemperature;
      this.tempHeladera = this.dispositivo.state.temperature;
    } else {
      this.dispositivo.routines.actions = [
        { name: "setMode", params: [this.modo] },
        { name: "setTemperature", params: [this.tempHeladera] },
        { name: "setFreezerTemperature", params: [this.tempFreezer] }
      ];
    }
  }
};
</script>