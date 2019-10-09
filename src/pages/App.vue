<template>
  <v-app>
    <NavBar v-model="entered"></NavBar>
    <ToolBar v-if="entered" :pisos="pisos"></ToolBar>
    <v-content class="primary">
      <br>
      <router-view></router-view>
    </v-content>
    <v-footer class="indigo darken-4 lime--text">
      <img src="@/assets/logo.png" class="mr-7" hegiht="80px" width="80px">
      <img src="@/assets/instagram.png" class="mx-1" height="50px" width="50px">
      <img src="@/assets/facebook.png" height="50px" width="50px">
      <img src="@/assets/youtoube.png" height="50px" width="50px">
      <img src="@/assets/twitter.png" height="50px" width="50px">
      <v-spacer></v-spacer>
      <v-list class="mx-3">
        <h1 class="font-weight-bold subtitle-1">Compañía</h1>
        <li class="body-2">Acerca de</li>
        <li class="body-2">Otros proyectos</li>
      </v-list >
      <v-list class="mx-3">
        <h1 class="font-weight-bold subtitle-1">Enlaces útiles</h1>
        <li class="body-2">Ayuda</li>
        <li class="body-2">Descargar aplicación móvil</li>
      </v-list >

    </v-footer>
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
      pisos: [],
      entered: false
    };
  },
  mounted() {
    let name = "chau";
    this.pisos.push({
      name: name,
      open: () => {
        this.$router.push("/pisos/" + name);
      }
    });
    let entered=sessionStorage.getItem("entered");
    this.entered=entered?true:false;
  }
};
</script>
