<template>
  <v-app>
    <NavBar v-model="entered"></NavBar>
    <ToolBar v-if="entered" :pisos="pisos"></ToolBar>
    <v-content class="primary">
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
      pisos: [],
      entered:false
    };
  },
  mounted() {
    var name="chau";
    this.pisos.push({
      name: name,
      open: () => {
        this.$router.push("/pisos/"+name);
      }
    })
  }
};
</script>
