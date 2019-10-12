
<template>
  <div>
    <v-row justify="center" align="center">
      <v-card
        :height="sizeOfCard.height"
        :width="sizeOfCard.width"
        class="overflow-y-auto light-blue"
      >
        <Rutina
          v-for="rutina in rutinas"
          :key="rutina.id"
          :rutina="rutina"
          @deleteRutina="deleteRutina"
          @executeStat="showExecStat"
        ></Rutina>
        <v-snackbar v-model="snackBar" :color="snackBarColor" :timeout="3000" bottom>
          <v-container class="pa-0 ma-0">
            <v-row justify="center" align="center" class="pa-0 ma-0">
              <p class="pa-0 ma-0">{{snackBarMessage}}</p>
            </v-row>
          </v-container>
        </v-snackbar>
        <v-card fill-width to="añadirRutina">
          <v-container fill-width raised class="grey my-2">
            <v-row justify="center" align="center">
              <p class="font-weight-bold headline">
                <v-icon class="mx-1">mdi-plus-box</v-icon>Añadir rutina
              </p>
            </v-row>
          </v-container>
        </v-card>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import api from "../plugins/api";
import Rutina from "@/components/rutinas/rutina.vue";

export default {
  name: "rutinas",
  components: {
    Rutina
  },
  data() {
    return {
      rutinas: [],
      sizeOfCard: {
        height: 10,
        width: 10
      },
      snackBar: false,
      snackBarMessage: "",
      snackBarColor: ""
    };
  },
  methods: {
    deleteRutina(id) {
      if(window.confirm("¿Está seguro que desea eliminar esta rutina?")){
        this.snackBarMessage = "Borrando rutina";
        this.snackBarColor = "info";
        this.snackBar = true;
        api.routines
          .delete(id)
          .then(() => {
            this.rutinas = this.rutinas.filter(v => {
              return v.id !== id;
            });
          })
          .catch(e => {
            console.error(e);
            this.snackBarMessage = "Hubo un error al borrar la rutina";
            this.snackBarColor = "error";
            this.snackBar = true;
          });
      }
    },
    showExecStat(e) {
      switch (e) {
        case -1:
          this.snackBarMessage = "Hubo un error al ejecutar la rutina";
          this.snackBarColor = "error";
          break;
        case 1:
          this.snackBarMessage = "Ejecutando rutina";
          this.snackBarColor = "info";
          break;
        case 2:
          this.snackBarMessage = "Rutina ejecutada con exito";
          this.snackBarColor = "success";
          break;
      }
      this.snackBar = true;
    }
  },
  mounted() {
    this.sizeOfCard.width = Math.floor((window.innerWidth - 30) / 250) * 200;
    if (this.sizeOfCard.width < 250) {
      this.sizeOfCard.width = 250;
    }
    this.sizeOfCard.height = window.innerHeight - 250;

    api.routines
      .getAll()
      .then(r => {
        this.rutinas = r.result;
      })
      .catch(e => {
        this.snackBar=false;
        this.snackBarMessage = "Error en la obtencion de las rutinas";
        this.snackBarColor = "error";
        this.snackBar = true;
        console.error(e);
      });
  }
};
</script>
