<template>
  <div>
    <p class="font-weight-black title">
      Dispositivos favoritos
    </p>
    <v-row justify="center" align="center">
      <DispositivosEnCuarto :dispositivos="dispositivos" :notShowAdd="true"></DispositivosEnCuarto>
    </v-row>
  </div>
</template>

<script>
import DispositivosEnCuarto from "@/components/dispositivosEnCuarto/dispositivosEnCuarto.vue";

import api from "@/plugins/api.js";

export default {
  name: "DispositivosFavoritos",
  components: {
    DispositivosEnCuarto
  },
  data(){
    return{dispositivos:[]};
  },
  mounted(){
    api.device.getAll().then((r)=>{
      r.devices=r.devices.filter((v)=>{
        return !!v.meta&&!!v.meta.fav&&v.meta.fav;
      });
      this.dispositivos=r.devices;
    })
  }
};
</script>