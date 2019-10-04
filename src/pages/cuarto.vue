<template>
  <div>
    <!-- TODO V-ICON FOR NAME CHANGE -->
    <p class="font-weight-black title">
      {{$route.params.id.replace(/_/g," ").replace(/^./g,$route.params.id[0].toUpperCase())}}
      <v-icon>mdi-pencil</v-icon>
    </p>
    <v-row justify="center" align="center">
      <DispositivosEnCuarto :dispositivos="dispositivos"></DispositivosEnCuarto>
    </v-row>
  </div>
</template>

<script>
import DispositivosEnCuarto from "@/components/dispositivosEnCuarto/dispositivosEnCuarto.vue";

export default {
  name: "Cuarto",
  components:{
    DispositivosEnCuarto
  },
  data() {
    return {
      sizeOfCard: {
        width: 0,
        height: 0
      },
      dispositivos:[],
      addIcon: "mdi-plus"
    };
  },
  mounted() {
    this.dispositivos.push({name:"a",type:"Aspiradora"});
    this.dispositivos.push({name:"a",type:"Parlante"});
    this.dispositivos.push({name:"a",type:"Persiana"});
    this.dispositivos.push({name:"a",type:"Lampara"});
    this.dispositivos.push({name:"a",type:"Horno"});
    this.dispositivos.push({name:"a",type:"AireAcondicionado"});
    this.dispositivos.push({name:"a",type:"Puerta"});
    this.dispositivos.push({name:"a",type:"Alarma"});
    this.dispositivos.push({name:"a",type:"Heladera"});
  }
};
</script>