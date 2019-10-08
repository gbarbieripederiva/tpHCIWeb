<template>
  <v-card fillWidth class="light-blue my-2">
    <v-card-title>
      {{dispositivo.name}}
      <v-icon @click="editDispositivo">mdi-pencil</v-icon>
      <v-spacer></v-spacer>
      <v-icon :color="favColor" @click="favDispositivo">mdi-star</v-icon>
    </v-card-title>

    <AireAcondicionado :dispositivo="dispositivo" v-if="dispositivo.type.name=='ac'"></AireAcondicionado>
    <Alarma :dispositivo="dispositivo" v-else-if="dispositivo.type.name=='alarm'"></Alarma>
    <Aspiradora :dispositivo="dispositivo" v-else-if="dispositivo.type.name=='vacuum'"></Aspiradora>
    <Heladera :dispositivo="dispositivo" v-else-if="dispositivo.type.name=='refrigerator'"></Heladera>
    <Horno :dispositivo="dispositivo" v-else-if="dispositivo.type.name=='oven'"></Horno>
    <Lampara :dispositivo="dispositivo" v-else-if="dispositivo.type.name=='lamp'"></Lampara>
    <Parlante :dispositivo="dispositivo" v-else-if="dispositivo.type.name=='speaker'"></Parlante>
    <Persiana :dispositivo="dispositivo" v-else-if="dispositivo.type.name=='blinds'"></Persiana>
    <Puerta :dispositivo="dispositivo" v-else-if="dispositivo.type.name=='door'"></Puerta>
    <DispositivoDesconocido :dispositivo="dispositivo" v-else></DispositivoDesconocido>
    <v-container>
      <v-row class="pr-4">
        <v-spacer></v-spacer>
        <v-icon @click="deleteDispositivo">mdi-delete</v-icon>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import AireAcondicionado from "./dispositivos/aireAcondicionado";
import Alarma from "./dispositivos/alarma";
import Aspiradora from "./dispositivos/aspiradora";
import Heladera from "./dispositivos/heladera";
import Horno from "./dispositivos/horno";
import Lampara from "./dispositivos/lampara";
import Parlante from "./dispositivos/parlante";
import Persiana from "./dispositivos/persiana";
import Puerta from "./dispositivos/puerta";
import DispositivoDesconocido from "./dispositivos/dispositivoDesconocido";

export default {
  name: "Dispositivo",
  props: ["dispositivo"],
  data(){
    return{
      fav:false,
      favColor:""
    };
  },
  components: {
    AireAcondicionado,
    Alarma,
    Aspiradora,
    Heladera,
    Horno,
    Lampara,
    Parlante,
    Persiana,
    Puerta,
    DispositivoDesconocido
  },methods:{
    deleteDispositivo(){
      console.log("delete "+this.dispositivo.name);
    },
    favDispositivo(){
      this.fav=!this.fav;
      this.favColor=this.fav?"yellow":"";
    },
    editDispositivo(){
      console.log("edit "+ this.dispositivo.name);
      
    }
  }
};
</script>