<template>
  <v-app>
    <NavBar></NavBar>
    <ToolBar :pisos="pisos"></ToolBar>
    <v-content class="primary">

    </v-content>
  </v-app>
</template>

<script>
import NavBar from "@/components/navBar/navbar.vue";
import ToolBar from "@/components/navBar/toolbar.vue";
export default {
  name: "App",
  components: { NavBar, ToolBar },
  data() {
    return {
      pisos: [
        {
          name: "hola",
          open: () => {
            console.log("hola");
          }
        }
      ]
    };
  },
  mounted() {
    this.pisos.push({
      name: "chau",
      open: () => {
        console.log("chau");
      }
    });
  }
};
</script>
