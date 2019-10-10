<template>
  <div>
    <v-row justify="center" align="center">
      <v-card
        :height="sizeOfCard.height"
        :width="sizeOfCard.width"
        class="overflow-y-auto light-blue"
      >
      <Dispositivo v-for="dispositivo in dispositivos" :key="dispositivo.id" :dispositivo="dispositivo"></Dispositivo>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import api from "@/plugins/api.js";
import Dispositivo from "@/components/dispositivosEnCuarto/dispositivo.vue";

export default {
  name: "AddRutina",
  components: {
    Dispositivo
  },
  data() {
    return {
      sizeOfCard: {
        height: 10,
        width: 10
      },
      dispositivos:[]
    };
  },
  mounted() {
    this.sizeOfCard.width = window.innerWidth - 40;
    this.sizeOfCard.height = window.innerHeight - 300;
    
    api.device.getAll().then((r)=>{
      this.dispositivos=r.devices;
      this.dispositivos.forEach((v)=>{
        v.routines={
          inRoutine:false
        }
      })
      console.log(this.dispositivos);
    }).catch((e)=>{
      console.error(e);
      
    });
  }
};
</script>