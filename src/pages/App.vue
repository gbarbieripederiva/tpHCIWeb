<template>
  <v-app>
    <NavBar v-model="entered"></NavBar>
    <ToolBar v-if="entered" :pisos="pisos"></ToolBar>
    <v-content class="primary">
        <router-view :users="$data"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from "@/components/navBar/navbar.vue";
import ToolBar from "@/components/navBar/toolbar.vue";
import CuartosEnPiso from "@/components/cuartosEnPiso/cuartosEnPiso.vue";

export default {
  name: "App",
  components: { NavBar, ToolBar, CuartosEnPiso },
  data() {
    return {
      pisos: [],
      cuartos: [],
      entered:false
    };
  },
  mounted() {
    this.pisos.push({
      name: "chau",
      open: () => {
        console.log("chau");
      }
    });
    for (var i = 0; i < 20; i++) {
      this.cuartos.push({
        name: "hola",
        img: "mdi-anchor",
        open: () => {
          console.log("hola");
        }
      });
    }
  }
};
</script>
