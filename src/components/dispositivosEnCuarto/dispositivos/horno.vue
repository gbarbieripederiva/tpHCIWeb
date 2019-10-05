<template>
  <v-container fill-width>
    <v-row>
      <v-col>
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
      heatSources:["convencional","abajo","arriba"],
      heatSource:"convencional",
      grillModes:["apagado", "económico", "completo"],
      grillMode: "apagado",
      convectionModes :["apagado", "económico", "completo"],
      convectionMode : "apagado"

    };
  }

}
</script>
