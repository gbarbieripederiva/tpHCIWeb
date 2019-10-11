<template>
  <v-app>
    <NavBar v-model="entered"></NavBar>
    <ToolBar v-if="entered"></ToolBar>
    <v-content class="blue darken-2">
      <br>
      <router-view></router-view>
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
      entered: false
    };
  },
  mounted() {
    let entered=sessionStorage.getItem("entered");
    this.entered=entered?true:false;
  }
};
</script>
