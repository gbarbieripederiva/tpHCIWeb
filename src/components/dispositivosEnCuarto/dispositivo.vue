<template>
  <v-card fillWidth class="light-blue my-2">
    <v-card-title>
      {{dispositivo.name}}
      <v-icon @click="editDispositivo">mdi-pencil</v-icon>
      <v-spacer></v-spacer>
      <v-icon :color="favColor" @click="favDispositivo">mdi-star</v-icon>
    </v-card-title>

    <AireAcondicionado :dispositivo="dispositivo" v-if="dispositivo.type=='AireAcondicionado'"></AireAcondicionado>
    <Alarma :dispositivo="dispositivo" v-else-if="dispositivo.type=='Alarma'"></Alarma>
    <Aspiradora :dispositivo="dispositivo" v-else-if="dispositivo.type=='Aspiradora'"></Aspiradora>
    <Heladera :dispositivo="dispositivo" v-else-if="dispositivo.type=='Heladera'"></Heladera>
    <Horno :dispositivo="dispositivo" v-else-if="dispositivo.type=='Horno'"></Horno>
    <Lampara :dispositivo="dispositivo" v-else-if="dispositivo.type=='Lampara'"></Lampara>
    <Parlante :dispositivo="dispositivo" v-else-if="dispositivo.type=='Parlante'"></Parlante>
    <Persiana :dispositivo="dispositivo" v-else-if="dispositivo.type=='Persiana'"></Persiana>
    <Puerta :dispositivo="dispositivo" v-else-if="dispositivo.type=='Puerta'"></Puerta>
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