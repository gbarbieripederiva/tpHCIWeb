<template>
  <v-card fillWidth class="light-blue my-2">
    <v-card-title>
      {{dispositivo.name}}
      <v-spacer></v-spacer>
      <v-icon v-if="!dispositivo.routines" :color="favColor" @click="favDispositivo">mdi-star</v-icon>
    </v-card-title>

    <AireAcondicionado :dispositivo="dispositivo" v-if="dispositivo.type.name=='ac'"></AireAcondicionado>
    <Alarma :dispositivo="dispositivo" v-else-if="dispositivo.type.name=='alarm'"></Alarma>
    <Heladera :dispositivo="dispositivo" v-else-if="dispositivo.type.name=='refrigerator'"></Heladera>
    <Horno :dispositivo="dispositivo" v-else-if="dispositivo.type.name=='oven'"></Horno>
    <Lampara :dispositivo="dispositivo" v-else-if="dispositivo.type.name=='lamp'"></Lampara>
    <Persiana
      :dispositivo="dispositivo"
      v-else-if="dispositivo.type.name=='blinds'&&!dispositivo.routines"
    ></Persiana>
    <PersianaRutina
      :dispositivo="dispositivo"
      v-else-if="dispositivo.type.name=='blinds'&&!!dispositivo.routines"
    ></PersianaRutina>
    <Puerta :dispositivo="dispositivo" v-else-if="dispositivo.type.name=='door'"></Puerta>
    <DispositivoDesconocido :dispositivo="dispositivo" v-else></DispositivoDesconocido>
    <v-container>
      <v-row class="pr-4">
        <v-spacer></v-spacer>
        <v-icon
          @click="deleteDispositivo"
          v-if="!dispositivo.routines&&dispositivo.type.name!=='alarm'"
        >mdi-delete</v-icon>
      </v-row>
    </v-container>
    <v-snackbar :color="snackBarColor" v-model="snackBar">
      <v-container class="pa-0 ma-0">
        <v-row justify="center" align="center">{{snackBarMessage}}</v-row>
      </v-container>
    </v-snackbar>
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
import PersianaRutina from "./dispositivos/persianaRutina.vue";
import Puerta from "./dispositivos/puerta";
import DispositivoDesconocido from "./dispositivos/dispositivoDesconocido";

import api from "@/plugins/api.js";

export default {
  name: "Dispositivo",
  props: ["dispositivo", "deleteDispositivoFromList"],
  data() {
    return {
      favColor: "",

      snackBarMessage: "",
      snackBarColor: "",
      snackBar: false
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
    PersianaRutina,
    Puerta,
    DispositivoDesconocido
  },
  methods: {
    deleteDispositivo() {
      api.device
        .delete(this.dispositivo.id)
        .then(r => {
          this.$emit("deleteDevice", this.dispositivo.id);
        })
        .catch(e => {
          console.error(e);
          this.snackBar = false;
          this.snackBarMessage = "Error al borrar dispositivo";
          this.snackBarColor = "error";
          this.snackBar = true;
        });
    },
    favDispositivo() {
      let device = {
        name: this.dispositivo.name,
        meta: {
          ...(this.dispositivo.meta ? this.dispositivo.meta : {}),
          fav:
            this.dispositivo.meta && this.dispositivo.meta.fav
              ? !this.dispositivo.meta.fav
              : true
        }
      };
      api.device
        .modify(this.dispositivo.id, device)
        .then(r => {
          this.favColor = !!device.meta && !!device.meta.fav ? "yellow" : "";
          this.dispositivo.meta = device.meta;
        })
        .catch(e => {
          console.error(e);
          this.snackBar = false;
          this.snackBarMessage = "Error al agregar dispositivo a favorito";
          this.snackBarColor = "error";
          this.snackBar = true;
        });
    }
  },
  mounted() {
    this.favColor =
      !!this.dispositivo.meta && !!this.dispositivo.meta.fav ? "yellow" : "";
  }
};
</script>