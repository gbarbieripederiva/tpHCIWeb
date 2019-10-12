<template>
  <nav>
    <v-toolbar :color="'rgb(48,151,166)'">
      <v-toolbar-title>
        <v-img :src="logo" alt="logo" height="40px" width="40px"></v-img>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/acercaDe" text>Acerca de</v-btn>
      <v-btn to="/ayuda" text>Ayuda</v-btn>
      <v-btn v-if="!value" rounded color="rgb(208,201,61)" @click="login()">Entrar</v-btn>
      <v-btn v-else rounded color="rgb(208,201,61)" @click="logout()">Salir</v-btn>
    </v-toolbar>
    <v-snackbar :color="snackBarColor" v-model="snackBar">
      <v-container class="pa-0 ma-0">
        <v-row justify="center" align="center">
          {{snackBarMessage}}
        </v-row>
      </v-container>
    </v-snackbar>
  </nav>
</template>

<script>
import logo from "@/assets/logo.png";
import api from "@/plugins/api.js";

export default {
  name: "NavBar",
  props: ["value"],
  data: function() {
    return {
      logo: logo,
      snackBarMessage: "",
      snackBarColor: "",
      snackBar: false
    };
  },
  methods: {
    login: function() {
      this.$emit("input", true);
      sessionStorage.setItem("entered", true);
      api.device
        .getAll()
        .then(r => {
          let existAlarm = false;
          r.devices.forEach(d => {
            if (d.type.name === "alarm") {
              existAlarm = true;
            }
          });
          if (!existAlarm) {
            return api.deviceType.getAll().then(r2 => {
              let alarmID = null;

              r2.result.forEach(d => {
                if (d.name === "alarm") {
                  alarmID = d.id;
                }
              });
              if (alarmID) {
                return api.device
                  .addDevice({
                    name: "alarm",
                    type: {
                      id: alarmID
                    },
                    meta: {
                      codigo: "1234"
                    }
                  })
                  .then(r3 => {
                    this.$router.push("/dispositivosFavoritos");
                  });
              } else {
                return Promise.reject(
                  new Error("No se pudo obtener el id de la alarma")
                );
              }
            });
          } else {
            this.$router.push("/dispositivosFavoritos");
          }
        })
        .catch(e => {
          console.error(e);
          this.snackBar = false;
          this.snackBarMessage = "Error en la correcta configuracion de entrada";
          this.snackBarColor = "error";
          this.snackBar = true;
        });
    },
    logout: function() {
      this.$emit("input", false);
      sessionStorage.removeItem("entered");
      this.$router.push("/");
    }
  }
};
</script>