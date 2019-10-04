
<template>
  <div>
    <v-row justify="center" align="center">
      <CuartosEnPiso :cuartos="cuartos"></CuartosEnPiso>
    </v-row>
  </div>
</template>

<script>
import CuartosEnPiso from "@/components/cuartosEnPiso/cuartosEnPiso.vue";

export default {
  name: "Piso",
  components: {
    CuartosEnPiso
  },data(){
    return {
      cuartos:[]
    };
  },
  mounted() {
    for (let i = 0; i < 10; i++) {
      this.cuartos.push({
        name: "hola",
        img: "mdi-anchor",
        open: () => {
          this.$router.push(this.$route.path+"/dormitorio/cuarto_de_guido");
        }
      });
    }
  }
};
</script>