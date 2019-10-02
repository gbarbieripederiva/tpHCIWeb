<template>
  <nav>
    <v-toolbar :color="'rgb(48,151,166)'">
      <v-toolbar-title>
        <v-img :src="logo" alt="logo" height="40px" width="40px"></v-img>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/text" text>Acerca de</v-btn>
      <v-btn to="/ayuda" text>Ayuda</v-btn>
      <v-btn rounded color="rgb(208,201,61)" @click="updateLogin()">Entrar</v-btn>
    </v-toolbar>
  </nav>
</template>

<script>
import logo from "@/assets/logo.png";

export default {
  name: "NavBar",
  props: ["value"],
  data: function() {
    return { logo: logo };
  },
  methods: {
    updateLogin:function(){
      this.$emit("input", true);
      this.$router.push("/pisos");
    }
  }
};
</script>