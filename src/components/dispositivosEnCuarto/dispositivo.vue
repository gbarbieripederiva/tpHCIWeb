<template>
  <v-container>
    <AireAcondicionado v-if="dispositivo.type=='AireAcondicionado'"></AireAcondicionado>
    <Alarma v-else-if="dispositivo.type=='Alarma'"></Alarma>
    <Aspiradora v-else-if="dispositivo.type=='Aspiradora'"></Aspiradora>
    <Heladera v-else-if="dispositivo.type=='Heladera'"></Heladera>
    <Horno v-else-if="dispositivo.type=='Horno'"></Horno>
    <Lampara v-else-if="dispositivo.type=='Lampara'"></Lampara>
    <Parlante v-else-if="dispositivo.type=='Parlante'"></Parlante>
    <Persiana v-else-if="dispositivo.type=='Persiana'"></Persiana>
    <Puerta v-else-if="dispositivo.type=='Puerta'"></Puerta>
    <DispositivoDesconocido v-else></DispositivoDesconocido>
  </v-container>
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
import DispositivoDesconocido from './dispositivos/dispositivoDesconocido';

export default {
  name: "Dispositivo",
  props: ["dispositivo"],
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
  }
};
</script>