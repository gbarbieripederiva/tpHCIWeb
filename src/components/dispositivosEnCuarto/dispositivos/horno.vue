<template>
  <v-container fill-width>
    <v-row>
      <v-spacer></v-spacer>
      <v-switch v-model="isOn">
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

      <v-row align="center" justify="center" class="my-3">
          <v-col cols="3">
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
        <v-col cols="3">
          <v-menu bottom offset-y origin="center top" transition="scale-transition">
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
        <v-col cols="3">
          <v-menu bottom offset-y origin="center top" transition="scale-transition">
            <template v-slot:activator="{ on }">
              <v-btn text outlined v-on="on">{{convectionMode}}</v-btn>
            </template>
            <v-list color="light-blue" flat nav>
              <v-list-item v-for="(convectionMode,index) in convectionModes" :key="index" @click="()=>{ changeGrillMode(convectionMode)}">
                <v-list-item-title>{{convectionMode}}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>

  </v-container>
</template>

<script>
export default {
    name:"Horno",
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
      },
      minusTemp(){
        if(this.temperature > this.tempRange[0])
          this.temperature -= 1;
    },
    changeHeatSource(heatSource){
        this.heatSource = heatSource;
    },
    changeGrillMode(grillMode){
      this.grillMode = grillMode;
    },
  }

}
</script>
