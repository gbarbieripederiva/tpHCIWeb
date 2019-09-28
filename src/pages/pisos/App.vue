<template>
  <v-app>
    <NavBar></NavBar>
    <ToolBar :pisos="pisos"></ToolBar>
    <v-content class="primary">
      <br />
      <div>
        <v-row justify="center" align="center">
          <CuartosEnPiso :cuartos="cuartos"></CuartosEnPiso>
        </v-row>
      </div>
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
      cuartos: []
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
        img: "mdi-anchor"
      });
    }
  }
};
</script>
