
<template>
  <v-content class="primary">
    <br />
    <div>
      <v-row justify="center" align="center">
        <CuartosEnPiso :cuartos="cuartos"></CuartosEnPiso>
      </v-row>
    </div>
  </v-content>
</template>

<script>
import CuartosEnPiso from "@/components/cuartosEnPiso/cuartosEnPiso.vue";

export default {
  name: "Piso",
  components: {
    CuartosEnPiso
  },
  computed: {
    cuartos() {
      let cuartos = [];
      console.log(this.$route.params.id);
      for (let i = 0; i < 10; i++) {
        cuartos.push({
          name: "hola",
          img: "mdi-anchor",
          open: () => {
            console.log("hola");
          }
        });
      }
      return cuartos;
    }
  }
};
</script>