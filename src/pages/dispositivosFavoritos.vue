<template>
  <div>
    <p class="font-weight-black title">
      Dispositivos favoritos
    </p>
    <v-row justify="center" align="center">
      <DispositivosEnCuarto :dispositivos="dispositivos"></DispositivosEnCuarto>
    </v-row>
  </div>
</template>

<script>
import DispositivosEnCuarto from "@/components/dispositivosEnCuarto/dispositivosEnCuarto.vue";
export default {
  name: "DispositivosFavoritos",
  components: {
    DispositivosEnCuarto
  },
  data(){
    return{dispositivos:[]};
  },
  mounted(){
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