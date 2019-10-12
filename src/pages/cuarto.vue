<template>
  <div>
    <!-- TODO V-ICON FOR NAME CHANGE -->
    <p class="font-weight-black title">
      {{$route.params.nameCuarto.replace(/_/g," ").replace(/^./g,$route.params.nameCuarto[0].toUpperCase())}}
      <v-icon @click="deleteRoom">mdi-delete</v-icon>
    </p>
    <v-row justify="center" align="center">
      <DispositivosEnCuarto @deleteDevice="deleteDispositivo" :dispositivos="dispositivos"></DispositivosEnCuarto>
    </v-row>
    <v-snackbar :color="snackBarColor" v-model="snackBar">
      <v-container class="ma-0 pa-0">
        <v-row justify="center" align="center">{{snackBarMessage}}</v-row>
      </v-container>
    </v-snackbar>
  </div>
</template>

<script>
import DispositivosEnCuarto from "@/components/dispositivosEnCuarto/dispositivosEnCuarto.vue";
import api from "@/plugins/api.js";

export default {
  name: "Cuarto",
  components: {
    DispositivosEnCuarto
  },
  data() {
    return {
      sizeOfCard: {
        width: 0,
        height: 0
      },
      dispositivos: [],
      addIcon: "mdi-plus",
      snackBarMessage: "",
      snackBarColor: "",
      snackBar: false
    };
  },
  mounted() {
    api.roomDevices
      .getAll(this.$route.params.idCuarto)
      .then(r => {
        this.dispositivos = r.result;
      })
      .catch(e => {
        console.error(e);
        this.snackBar = false;
        this.snackBarMessage = "Error en la obtencion de los dispositivos";
        this.snackBarColor = "error";
        this.snackBar = true;
      });
  },
  methods: {
    deleteRoom() {
      if (window.confirm("¿Estas seguro que queres eliminar este cuarto?")) {
        api.room
          .delete(this.$route.params.idCuarto)
          .then(() => {
            this.$router.push("/cuartos");
          })
          .catch(e => {
            console.error(e);
            this.snackBar = false;
            this.snackBarMessage = "Error en la eliminacíon del cuarto";
            this.snackBarColor = "error";
            this.snackBar = true;
          });
      }
    },
    deleteDispositivo(id) {
      this.dispositivos = this.dispositivos.filter(v => {
        return v.id != id;
      });
    }
  }
};
</script>