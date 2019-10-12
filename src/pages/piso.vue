
<template>
  <div>
    <v-row justify="center" align="center">
      <CuartosEnPiso :cuartos="cuartos"></CuartosEnPiso>
    </v-row>
    <v-snackbar v-model="snackBar" :color="snackBarColor">
      <v-container class="pa-0 ma-0">
        <v-row justify="center" align="center">
          {{snackBarMessage}}
        </v-row>
      </v-container>
    </v-snackbar>
  </div>
</template>

<script>
import CuartosEnPiso from "@/components/cuartosEnPiso/cuartosEnPiso.vue";
import api from "@/plugins/api.js";

export default {
  name: "Piso",
  components: {
    CuartosEnPiso
  },
  data() {
    return {
      cuartos: [],
        snackBarMessage:"",
        snackBarColor:"",
        snackBar:false
    };
  },
  mounted() {
    api.room
      .getAll()
      .then(r => {
        this.cuartos = r.result.map(v => {
          return {
            name: v.name,
            img: v.meta.img,
            open: () => {
              this.$router.push(this.$route.path + "/" + v.id + "/" + v.name);
            }
          };
        });
      })
      .catch(e => {
        this.snackBar = false;
        this.snackBarMessage = "Error en la obtencion de cuartos";
        this.snackBarColor = "error";
        this.snackBar = true;
        console.error(e);
      });
  }
};
</script>