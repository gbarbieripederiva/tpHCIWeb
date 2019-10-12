<template>
  <div>
    <p class="font-weight-black title mx-5">Dispositivos favoritos</p>
    <v-row justify="center" align="center">
      <DispositivosEnCuarto :dispositivos="dispositivos" :notShowAdd="true"></DispositivosEnCuarto>
    </v-row>
    <v-snackbar v-model="snackBar" :color="snackBarColor">
      <v-container class="ma-0 pa-0">
        <v-row justify="center" align="center">
          {{snackBarMessage}}
        </v-row>
      </v-container>
    </v-snackbar>
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
  data() {
    return { dispositivos: [] ,
    
        snackBarMessage:"",
        snackBarColor:"",
        snackBar:false
        };
  },
  mounted() {
    api.device
      .getAll()
      .then(r => {
        r.devices = r.devices.filter(v => {
          return !!v.meta && !!v.meta.fav && v.meta.fav;
        });
        this.dispositivos = r.devices;
      })
      .catch(e => {
        this.snackBar = false;
        this.snackBarMessage = "Error en la obtencion de los dispositivos";
        this.snackBarColor = "error";
        this.snackBar = true;
        console.error(e);
      });
  }
};
</script>