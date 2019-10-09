<template>
  <v-container fill-width>
    <v-row>
      <v-spacer></v-spacer>
      <v-switch @change="OnOff" v-model="isOn" >
        <template v-slot:prepend>
          <v-icon>mdi-power-off</v-icon>
        </template>
        <template v-slot:append>
          <v-icon>mdi-power-on</v-icon>
        </template>
        </v-switch>
    </v-row>
    <v-row justify="center">
      <v-col cols="6">
        <v-row>
          <v-slider
                  step="1"
                  ticks
                  v-model="temperature"
                  :min="tempRange[0]"
                  :max="tempRange[1]"
                  @click="setTemp"

          >
            <template v-slot:append>
              <v-icon @click="plusTemp">mdi-plus</v-icon>
            </template>
            <template v-slot:prepend>
              <v-icon @click="minusTemp">mdi-minus</v-icon>
            </template>
            <template v-slot:thumb-label>
              {{temperature + unit}}
            </template>
          </v-slider>
        </v-row>
      </v-col>
    </v-row>

      <v-row align="center" justify="space-around" class="my-3">
          <v-col >
            <p class="mx-2 font-weight-bold">Fuente de calor:</p>
              <v-menu bottom offset-y origin="center top" transition="scale-transition">
              <template v-slot:activator="{ on }">
                <v-btn text outlined v-on="on">{{heatSource}}</v-btn>
              </template>
                <v-list color="light-blue" flat nav>
                  <v-list-item v-for="(heatSource,index) in heatSources" :key="index" @click="()=>{ changeHeatSource(heatSource)}">
                    <v-list-item-title>{{heatSource}}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
        </v-col>
        <v-col >
            <p class="mx-2 font-weight-bold">Modo grill:</p>

            <v-menu bottom offset-y origin="center top" transition="scale-transition" align="center" justify="center">
              <template v-slot:activator="{ on }">
                <v-btn text outlined v-on="on">{{grillMode}}</v-btn>
              </template>
              <v-list color="light-blue" flat nav>
                <v-list-item v-for="(grillMode,index) in grillModes" :key="index" @click="()=>{ changeGrillMode(grillMode)}">
                  <v-list-item-title>{{grillMode}}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
        </v-col>
        <v-col>
          <p class="mx-2 font-weight-bold">Modo de convección:</p>
            <v-menu bottom offset-y origin="center top" transition="scale-transition">
              <template v-slot:activator="{ on }">
                <v-btn text outlined v-on="on">{{convectionMode}}</v-btn>
              </template>
              <v-list color="light-blue" flat nav>
                <v-list-item v-for="(convectionMode,index) in convectionModes" :key="index" @click="()=>{ changeConvectionMode(convectionMode)}">
                  <v-list-item-title>{{convectionMode}}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
        </v-col>
      </v-row>

  </v-container>
</template>

<script>
import api from "../../../plugins/api";

export default {
    name:"Horno",
    props: ["dispositivo"],
  data(){
    return{
      isOn: false,
      temperature: 90,
      tempRange: [90,230],
      heatSources:["convencional","abajo","arriba"],
      heatSource:"convencional",
      grillModes:["apagado", "económico", "completo"],
      grillMode: "apagado",
      convectionModes :["apagado", "económico", "completo"],
      convectionMode : "apagado",
      unit: "°C"

    };
  },
  methods:{
      plusTemp(){
        if(this.temperature < this.tempRange[1])
          this.temperature += 1;
          api.device.putAction(this.dispositivo.id, "setTemperature", [this.temperature]);
      },
      minusTemp(){
        if(this.temperature > this.tempRange[0])
          this.temperature -= 1;
        api.device.putAction(this.dispositivo.id, "setTemperature", [this.temperature]);
    },
    setTemp(){
      api.device.putAction(this.dispositivo.id, "setTemperature", [this.temperature]);
    },
    changeHeatSource(heatSource){
        this.heatSource = heatSource;
        api.device.putAction(this.dispositivo.id, "setHeat", [this.heatSource])
    },
    changeGrillMode(grillMode){
      this.grillMode = grillMode;
      api.device.putAction(this.dispositivo.id, "setGrill", [this.grillMode]);
    },
    changeConvectionMode(convectionMode){
        this.convectionMode = convectionMode;
        api.device.putAction(this.dispositivo.id, "setConvection", [this.convectionMode]);
    },
    OnOff(){
        let action = (this.isOn === true ? "turnOn" : "turnOff");
        api.device.putAction(this.dispositivo.id, action);
    }
  }

}
</script>
